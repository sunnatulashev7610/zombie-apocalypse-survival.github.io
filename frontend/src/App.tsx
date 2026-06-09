import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { classStats, drawPlayer, drawZombie, mapRegions, regionNames, world } from './game/engine';
import { ClassId, PlayerState, RegionKey, SessionState } from './game/types';

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5000';

const classOptions: Record<ClassId, string> = {
  soldier: 'Soldier',
  medic: 'Medic',
  scout: 'Scout',
  engineer: 'Engineer'
};

function App() {
  const [playerName, setPlayerName] = useState('Survivor');
  const [playerClass, setPlayerClass] = useState<ClassId>('soldier');
  const [connected, setConnected] = useState(false);
  const [session, setSession] = useState<SessionState | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState('');
  const [abilityCooldown, setAbilityCooldown] = useState(0);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const movement = useRef({ up: false, down: false, left: false, right: false });
  const playerId = useRef<string>('');

  const currentPlayer = useMemo(() => {
    if (!session || !playerId.current) return null;
    return session.players[playerId.current] ?? null;
  }, [session]);

  useEffect(() => {
    const socket = io(SERVER_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('joined', (payload: { id: string; state: SessionState }) => {
      playerId.current = payload.id;
      setSession(payload.state);
      setLogs((it) => [...it, 'Connected to match.']);
    });
    socket.on('stateUpdate', (state: SessionState) => {
      setSession(state);
    });
    socket.on('log', (message: string) => {
      setLogs((it) => [message, ...it].slice(0, 20));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !session) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, world.width, world.height);
      ctx.fillStyle = '#0b1220';
      ctx.fillRect(0, 0, world.width, world.height);

      if (session) {
        Object.values(session.zombies).forEach((zombie) => drawZombie(ctx, zombie));
        Object.values(session.players).forEach((player) => drawPlayer(ctx, player));
      }

      requestAnimationFrame(render);
    };

    render();
  }, [session]);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (event.repeat) return;
      switch (event.key) {
        case 'w': movement.current.up = true; break;
        case 's': movement.current.down = true; break;
        case 'a': movement.current.left = true; break;
        case 'd': movement.current.right = true; break;
        case ' ': useAbility(); break;
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w': movement.current.up = false; break;
        case 's': movement.current.down = false; break;
        case 'a': movement.current.left = false; break;
        case 'd': movement.current.right = false; break;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [currentPlayer, abilityCooldown]);

  useEffect(() => {
    const interval = setInterval(() => {
      const socket = socketRef.current;
      if (!socket || !currentPlayer) return;
      const moveX = Number(movement.current.right) - Number(movement.current.left);
      const moveY = Number(movement.current.down) - Number(movement.current.up);
      if (moveX || moveY) {
        socket.emit('playerMove', { x: moveX, y: moveY });
      }
      if (abilityCooldown > 0) {
        setAbilityCooldown((cool) => Math.max(0, cool - 1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentPlayer, abilityCooldown]);

  const joinMatch = () => {
    const socket = socketRef.current;
    if (!socket || !playerName) return;
    socket.emit('joinMatch', { name: playerName, classId: playerClass });
    setReady(true);
  };

  const useAbility = () => {
    if (!currentPlayer || abilityCooldown > 0 || !socketRef.current) return;
    const ability = classStats[currentPlayer.classId].ability;
    setSelectedAbility(ability);
    setAbilityCooldown(classStats[currentPlayer.classId].cooldown);
    socketRef.current.emit('useAbility', { ability });
  };

  const renderInventory = () => {
    if (!currentPlayer) return <li>Empty</li>;
    return Object.entries(currentPlayer.inventory).map(([item, count]) => (
      <li key={item}>{item.replaceAll('_', ' ')}: {count}</li>
    ));
  };

  return (
    <div className="app-shell">
      <div className="panel">
        <h2>Zombie Survival Lobby</h2>
        <p>Server: {SERVER_URL}</p>
        <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
        <label>Name</label>
        <input
          type="text"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          disabled={ready}
        />
        <label>Class</label>
        <select
          value={playerClass}
          onChange={(event) => setPlayerClass(event.target.value as ClassId)}
          disabled={ready}
        >
          {Object.entries(classOptions).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <button onClick={joinMatch} disabled={!connected || ready}>
          {ready ? 'Waiting for match...' : 'Join Match'}
        </button>

        <div className="status-line">
          <div className="panel">
            <h3>Player</h3>
            {currentPlayer ? (
              <ul className="stats-list">
                <li>{currentPlayer.name} ({classOptions[currentPlayer.classId]})</li>
                <li>HP: {currentPlayer.hp}</li>
                <li>Stamina: {Math.round(currentPlayer.stamina)}</li>
                <li>Level: {currentPlayer.level}</li>
                <li>XP: {currentPlayer.xp}</li>
                <li>Zone: {regionNames[currentPlayer.zone]}</li>
              </ul>
            ) : (
              <p>Join a match to see your stats.</p>
            )}
          </div>
          <div className="panel">
            <h3>Ability</h3>
            <p>{selectedAbility || 'Ready'}</p>
            <p>Cooldown: {abilityCooldown}s</p>
            <button onClick={useAbility} disabled={!currentPlayer || abilityCooldown > 0}>Activate</button>
          </div>
        </div>

        <div className="panel">
          <h3>Inventory</h3>
          <ul className="inventory-list">{renderInventory()}</ul>
        </div>
      </div>

      <div className="panel">
        <canvas ref={canvasRef} className="game-canvas" width={world.width} height={world.height} />
        <div className="panel">
          <h3>Current Zone</h3>
          <p>{session ? regionNames[session.region] : 'Waiting for match'}</p>
          <p>{session ? mapRegions[session.region].mechanics : 'Match not joined'}</p>
        </div>
        <div className="panel">
          <h3>Event Log</h3>
          <ul className="log-list">{logs.map((log, idx) => <li key={idx}>{log}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
