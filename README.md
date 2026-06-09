# Zombie Apocalypse Survival Game 🧟‍♂️

A complete 2D top-down multiplayer survival game scaffold with a React client and Node.js backend. Players explore five zombie zones, choose a class, fight enemies, collect loot, and battle for zone control.

## 🚀 What’s Included

- **Frontend**: React + TypeScript client with real-time canvas rendering
- **Backend**: Express + Socket.IO server for authoritative multiplayer state
- **Multiplayer**: 2-8 players per session, synchronized movement and actions
- **Map Regions**: Abandoned City, Quarantine Zone, Abandoned Factory, Dark Forest, Safe Haven
- **Classes**: Soldier, Medic, Scout, Engineer
- **AI Enemies**: Basic zombie, fast zombie, tank mutant, stealth creature, robot enemy
- **Core Systems**: combat, inventory, abilities, progression, matchmaking, zone mechanics

## 📁 Repository Structure

```
/zombie-apocalypse-survival.github.io
├── backend/           # Node.js game server
│   ├── src/
│   │   ├── index.ts
│   │   └── game/
│   │       ├── engine.ts
│   │       ├── server.ts
│   │       └── types.ts
├── frontend/          # React client app
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── styles.css
│   │   └── game/
│   │       ├── engine.ts
│   │       └── types.ts
├── docs/              # Design and API documentation
├── assets/            # Placeholder for art and audio
├── .gitignore
└── README.md
```

## 🧩 Quick Start

### Install dependencies

```bash
cd /workspaces/zombie-apocalypse-survival.github.io/frontend
npm install

cd ../backend
npm install
```

### Start backend server

```bash
cd backend
npm run dev
```

### Start frontend client

```bash
cd frontend
npm run dev
```

Open the browser at the Vite URL (usually `http://localhost:3000`).

## 🎮 Core Gameplay

- Players join a match and select a class.
- Move with WASD and use ability with spacebar.
- Fight zombies with class-specific strengths.
- Survive region hazards and collect loot.
- Endgame unfolds in Safe Haven for PvP and final survival.

## 📚 Documentation

- [Game Design Document](./docs/GAME_DESIGN.md)
- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)

## 🧠 Game Systems

- **Combat**: AI chases players and applies damage, player abilities influence nearby threats.
- **Multiplayer**: Real-time synchronization through Socket.IO.
- **Zones**: Each region features unique enemies, loot, and mechanics.
- **Progression**: XP, levels, and inventory items support player growth.

## 📝 Notes

This repository contains a foundational multiplayer survival game project. You can extend it with sprites, audio, better matchmaking, PvP rules, and a full crafting system.
