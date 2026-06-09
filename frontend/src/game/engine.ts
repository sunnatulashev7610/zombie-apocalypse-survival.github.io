import { EnemyType, PlayerState, RegionKey, WorldConstants, ZombieState } from './types';

export const world: WorldConstants = {
  width: 1280,
  height: 720
};

export const regionNames: Record<RegionKey, string> = {
  city: 'Abandoned City',
  quarantine: 'Quarantine Zone',
  factory: 'Abandoned Factory',
  forest: 'Dark Forest',
  safehouse: 'Safe Haven'
};

export const classStats = {
  soldier: { hp: 120, speed: 1.6, damage: 22, ability: 'Rapid Fire', cooldown: 8 },
  medic: { hp: 110, speed: 1.4, damage: 12, ability: 'Area Heal', cooldown: 12 },
  scout: { hp: 95, speed: 2.2, damage: 14, ability: 'Invisibility', cooldown: 15 },
  engineer: { hp: 105, speed: 1.5, damage: 16, ability: 'Deploy Turret', cooldown: 18 }
} as const;

export const enemyConfig: Record<EnemyType, { speed: number; size: number; color: string; damage: number; weakness: string }> = {
  basic: { speed: 0.8, size: 18, color: '#84cc16', damage: 10, weakness: 'headshots' },
  fast: { speed: 1.8, size: 14, color: '#fb923c', damage: 8, weakness: 'melee' },
  tank: { speed: 0.5, size: 24, color: '#f97316', damage: 22, weakness: 'armor-piercing' },
  stealth: { speed: 1.3, size: 16, color: '#94a3b8', damage: 12, weakness: 'spotlight' },
  robot: { speed: 1.0, size: 20, color: '#38bdf8', damage: 14, weakness: 'EMP' }
};

export const mapRegions: Record<RegionKey, { enemies: EnemyType[]; loot: string[]; mechanics: string }> = {
  city: {
    enemies: ['basic', 'fast'],
    loot: ['medkit', 'weapon_part'],
    mechanics: 'vertical buildings and rooftop loot'
  },
  quarantine: {
    enemies: ['tank'],
    loot: ['antidote', 'armor_suit'],
    mechanics: 'toxic zones cause damage over time'
  },
  factory: {
    enemies: ['robot'],
    loot: ['crafting_material', 'rare_metal'],
    mechanics: 'interactive machines and mechanical hazards'
  },
  forest: {
    enemies: ['stealth', 'fast'],
    loot: ['food', 'hidden_chest'],
    mechanics: 'low visibility and stealth movement'
  },
  safehouse: {
    enemies: [],
    loot: ['trade_crate', 'storage_key'],
    mechanics: 'final PvP zone with trading, storage, and survival battle'
  }
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function drawPlayer(ctx: CanvasRenderingContext2D, player: PlayerState) {
  ctx.fillStyle = player.alive ? '#60a5fa' : '#475569';
  ctx.beginPath();
  ctx.arc(player.x, player.y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Inter';
  ctx.fillText(player.name, player.x + 16, player.y - 10);
}

export function drawZombie(ctx: CanvasRenderingContext2D, zombie: ZombieState) {
  const config = enemyConfig[zombie.type];
  ctx.fillStyle = config.color;
  ctx.beginPath();
  ctx.arc(zombie.x, zombie.y, config.size / 2, 0, Math.PI * 2);
  ctx.fill();
}
