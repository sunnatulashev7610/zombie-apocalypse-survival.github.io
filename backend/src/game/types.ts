export type RegionKey = 'city' | 'quarantine' | 'factory' | 'forest' | 'safehouse';

export interface PlayerState {
  id: string;
  name: string;
  classId: ClassId;
  x: number;
  y: number;
  hp: number;
  stamina: number;
  xp: number;
  level: number;
  alive: boolean;
  inventory: Record<string, number>;
  zone: RegionKey;
}

export type ClassId = 'soldier' | 'medic' | 'scout' | 'engineer';

export interface ZombieState {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  hp: number;
  alive: boolean;
  targetId?: string;
}

export type EnemyType = 'basic' | 'fast' | 'tank' | 'stealth' | 'robot';

export interface SessionState {
  players: Record<string, PlayerState>;
  zombies: Record<string, ZombieState>;
  region: RegionKey;
  logs: string[];
}
