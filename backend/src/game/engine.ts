import { ClassId, EnemyType, RegionKey } from './types.js';

export const world = {
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

export const classStats: Record<ClassId, { hp: number; speed: number; damage: number; ability: string; cooldown: number }> = {
  soldier: { hp: 120, speed: 1.6, damage: 22, ability: 'Rapid Fire', cooldown: 8 },
  medic: { hp: 110, speed: 1.4, damage: 12, ability: 'Area Heal', cooldown: 12 },
  scout: { hp: 95, speed: 2.2, damage: 14, ability: 'Invisibility', cooldown: 15 },
  engineer: { hp: 105, speed: 1.5, damage: 16, ability: 'Deploy Turret', cooldown: 18 }
};

export const enemyConfig: Record<EnemyType, { speed: number; size: number; color: string; damage: number }> = {
  basic: { speed: 0.8, size: 18, color: '#84cc16', damage: 10 },
  fast: { speed: 1.8, size: 14, color: '#fb923c', damage: 8 },
  tank: { speed: 0.5, size: 24, color: '#f97316', damage: 22 },
  stealth: { speed: 1.3, size: 16, color: '#94a3b8', damage: 12 },
  robot: { speed: 1.0, size: 20, color: '#38bdf8', damage: 14 }
};

export const mapRegions: Record<RegionKey, { enemies: EnemyType[]; loot: string[]; mechanics: string }> = {
  city: { enemies: ['basic', 'fast'], loot: ['medkit', 'weapon_part'], mechanics: 'vertical buildings and rooftop loot' },
  quarantine: { enemies: ['tank'], loot: ['antidote', 'armor_suit'], mechanics: 'toxic zones cause damage over time' },
  factory: { enemies: ['robot'], loot: ['crafting_material', 'rare_metal'], mechanics: 'interactive machines and mechanical hazards' },
  forest: { enemies: ['stealth', 'fast'], loot: ['food', 'hidden_chest'], mechanics: 'low visibility and stealth movement' },
  safehouse: { enemies: [], loot: ['trade_crate', 'storage_key'], mechanics: 'final PvP zone with trading, storage, and survival battle' }
};
