# Game Design Document

## Overview

Zombie Apocalypse Survival is a 2D top-down multiplayer survival game. Players explore five unique regions, collect resources, fight zombies and each other, and use class abilities to survive.

## Map Regions

1. **Abandoned City**
   - Enemies: Basic zombies, fast raiders
   - Loot: Medkits, weapon parts
   - Mechanics: Vertical buildings, rooftop loot

2. **Quarantine Zone**
   - Enemies: Mutated heavy zombies
   - Loot: Antidotes, armor suits
   - Mechanics: Toxic damage-over-time areas

3. **Abandoned Factory**
   - Enemies: Robotic enemies, mechanical traps
   - Loot: Crafting materials, rare metals
   - Mechanics: Interactive machines and hazards

4. **Dark Forest**
   - Enemies: Stealth zombies, mutated animals
   - Loot: Food, hidden chests
   - Mechanics: Low visibility and stealth gameplay

5. **Safe Haven (End Zone)**
   - PvP enabled
   - Storage, trading system
   - Final survival battle area

## Playable Classes

- **Soldier**: High damage, low stamina, ability Rapid Fire
- **Medic**: Healing support, ability Area Heal
- **Scout**: Fast movement, stealth, ability Invisibility
- **Engineer**: Builds turrets, ability Deploy Turret

## Core Systems

- Multiplayer synchronization using Socket.IO
- Combat with projectiles, melee, and enemy attacks
- Inventory for weapons, health kits, armor, and crafting materials
- Crafting and upgrade progression through XP and levels
- Zone control and difficulty escalation through region transitions
