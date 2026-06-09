import { Server, Socket } from 'socket.io';
import { ClassId, EnemyType, PlayerState, RegionKey, SessionState, ZombieState } from './types.js';
import { classStats, enemyConfig, mapRegions, regionNames, world } from './engine.js';

const regionOrder: RegionKey[] = ['city', 'quarantine', 'factory', 'forest', 'safehouse'];
const spawnZones: Record<RegionKey, { x: number; y: number }> = {
  city: { x: 220, y: 200 },
  quarantine: { x: 400, y: 260 },
  factory: { x: 700, y: 320 },
  forest: { x: 980, y: 420 },
  safehouse: { x: 1100, y: 180 }
};

export function createGameServer(io: Server) {
  const session: SessionState = {
    players: {},
    zombies: {},
    region: 'city',
    logs: []
  };

  const matchQueue: Array<{ id: string; name: string; classId: ClassId }> = [];
  let tickCount = 0;

  function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function addLog(message: string) {
    session.logs.unshift(message);
    if (session.logs.length > 40) session.logs.pop();
    io.emit('log', message);
  }

  function buildPlayer(id: string, name: string, classId: ClassId): PlayerState {
    const stats = classStats[classId];
    const spawn = spawnZones[session.region];
    return {
      id,
      name,
      classId,
      x: spawn.x,
      y: spawn.y,
      hp: stats.hp,
      stamina: 100,
      xp: 0,
      level: 1,
      alive: true,
      inventory: { medkit: 1, ammo: 5, armor_suit: 0 },
      zone: session.region
    };
  }

  function spawnZombie(type: EnemyType) {
    const offset = Math.random() * 100 - 50;
    const zone = session.region;
    const start = spawnZones[zone];
    const id = createId();
    session.zombies[id] = {
      id,
      type,
      x: start.x + offset,
      y: start.y + offset,
      hp: type === 'tank' ? 240 : type === 'robot' ? 180 : type === 'stealth' ? 90 : 120,
      alive: true,
      targetId: undefined
    };
  }

  function updateGame() {
    tickCount += 1;
    if (tickCount % 25 === 0) {
      const regionData = mapRegions[session.region];
      const types = regionData.enemies.length ? regionData.enemies : ['basic'];
      spawnZombie(types[Math.floor(Math.random() * types.length)]);
      addLog(`A new enemy has entered ${regionNames[session.region]}.`);
    }

    Object.values(session.zombies).forEach((zombie) => {
      if (!zombie.alive) return;
      const players = Object.values(session.players).filter((player) => player.alive);
      if (players.length === 0) return;
      const target = players[Math.floor(Math.random() * players.length)];
      zombie.targetId = target.id;
      const dx = target.x - zombie.x;
      const dy = target.y - zombie.y;
      const distance = Math.hypot(dx, dy) || 1;
      const config = enemyConfig[zombie.type];
      zombie.x += (dx / distance) * config.speed * 4;
      zombie.y += (dy / distance) * config.speed * 4;
      if (distance < config.size + 10) {
        target.hp -= config.damage * 0.25;
        if (target.hp <= 0) {
          target.alive = false;
          addLog(`${target.name} was taken down by a ${zombie.type} enemy.`);
        }
      }
    });

    Object.values(session.players).forEach((player) => {
      if (!player.alive) return;
      if (player.stamina < 100) {
        player.stamina += 0.3;
      }
      player.stamina = Math.min(100, player.stamina);
      if (player.zone !== session.region) {
        player.zone = session.region;
      }
    });

    io.emit('stateUpdate', session);
  }

  io.on('connection', (socket: Socket) => {
    socket.on('joinMatch', ({ name, classId }: { name: string; classId: ClassId }) => {
      matchQueue.push({ id: socket.id, name, classId });
      socket.data.name = name;
      socket.data.classId = classId;
      if (!session.players[socket.id]) {
        session.players[socket.id] = buildPlayer(socket.id, name, classId);
      }
      socket.emit('joined', { id: socket.id, state: session });
      addLog(`${name} joined the match as ${classId}.`);
      if (Object.keys(session.players).length > 1 && Object.keys(session.players).length <= 8) {
        addLog('Match ready. Survive and control the zones!');
      }
    });

    socket.on('playerMove', ({ x, y }: { x: number; y: number }) => {
      const player = session.players[socket.id];
      if (!player || !player.alive) return;
      const speed = classStats[player.classId].speed;
      const nextX = player.x + x * speed * 3;
      const nextY = player.y + y * speed * 3;
      player.x = Math.min(Math.max(nextX, 20), world.width - 20);
      player.y = Math.min(Math.max(nextY, 20), world.height - 20);
    });

    socket.on('useAbility', ({ ability }: { ability: string }) => {
      const player = session.players[socket.id];
      if (!player || !player.alive) return;
      if (ability === 'Area Heal') {
        Object.values(session.players).forEach((member) => {
          if (!member.alive) return;
          member.hp = Math.min(member.hp + 18, classStats[member.classId].hp);
        });
      }
      if (ability === 'Rapid Fire') {
        Object.values(session.zombies).forEach((zombie) => {
          if (!zombie.alive) return;
          const dx = zombie.x - player.x;
          const dy = zombie.y - player.y;
          if (Math.hypot(dx, dy) < 120) {
            zombie.hp -= 40;
          }
        });
      }
      if (ability === 'Invisibility') {
        player.stamina = Math.min(100, player.stamina + 30);
      }
      if (ability === 'Deploy Turret') {
        const turretId = uuid();
        session.zombies[turretId] = {
          id: turretId,
          type: 'robot',
          x: player.x + 24,
          y: player.y + 24,
          hp: 1,
          alive: true,
          targetId: undefined
        };
      }
      addLog(`${player.name} used ${ability}.`);
    });

    socket.on('disconnect', () => {
      if (session.players[socket.id]) {
        addLog(`${session.players[socket.id].name} disconnected.`);
        delete session.players[socket.id];
      }
    });
  });

  function start() {
    setInterval(updateGame, 200);
  }

  return { start };
}
