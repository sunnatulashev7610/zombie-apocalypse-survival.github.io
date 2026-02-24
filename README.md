# Zombie Apocalypse Survival Game 🧟‍♂️

A multiplayer post-apocalyptic survival game built with React, Node.js, and WebSocket. Players must gather resources, conquer territories, and survive against zombies and other players.

## 🎮 Game Features

- **5 Dynamic Map Zones** - Abandoned City, Quarantine Zone, Factory, Dark Forest, Safe Haven
- **4 Character Classes** - Soldier, Medic, Scout, Engineer
- **Multiplayer Support** - 2-8 players per session
- **Resource Management** - Food, Ammo, Medicine, Parts, Armor
- **PvP & PvE** - Cooperation and competition mixed gameplay
- **Progressive Difficulty** - Different threat levels per zone

## 📁 Project Structure

```
zombie-apocalypse-survival/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── docs/              # Game documentation and design
├── assets/            # Images, sounds, sprites
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── package.json       # Project metadata
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sunnatulashev7610/zombie-apocalypse-survival.git
cd zombie-apocalypse-survival
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend (in another terminal)
cd ../backend
npm install
```

3. Start development servers:
```bash
# Frontend (runs on http://localhost:3000)
cd frontend
npm start

# Backend (runs on http://localhost:5000)
cd backend
npm start
```

## 🎯 Game Rules

1. **Objective**: Survive and conquer all 5 zones
2. **Resources**: Collect food, ammo, medicine, parts, armor
3. **Enemies**: Fight zombies and mutated creatures
4. **PvP Zone**: Safe Haven is the only PvP area
5. **Win Condition**: Control all zones or be last survivor in Safe Haven

## 👥 Character Classes

| Class | Strength | Weakness |
|-------|----------|----------|
| **Soldier** | High damage | Low speed, fast energy loss |
| **Medic** | Heal teammates | Low combat damage |
| **Scout** | Fast, stealthy | Low armor |
| **Engineer** | Build structures | Weak in melee |

## 🗺️ Map Zones

### 1. Abandoned City
- **Enemies**: Basic zombies, bandits
- **Resources**: Health packs, weapon parts
- **Special**: Valuable items on rooftops

### 2. Quarantine Zone
- **Enemies**: Mutated zombies (strong)
- **Resources**: Armor, antidotes, boosters
- **Special**: Can be secured safely

### 3. Abandoned Factory
- **Enemies**: Mechanical/robotic enemies
- **Resources**: Crafting materials, minerals
- **Special**: High risk, high reward

### 4. Dark Forest
- **Enemies**: Hidden zombies, mutated creatures
- **Resources**: Food, hidden treasures, hunting weapons
- **Special**: Low light, ideal for stealth

### 5. Safe Haven
- **Enemies**: Other players (PvP only)
- **Resources**: Trading post, storage
- **Special**: Final battle zone

## 📊 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express
- **Real-time**: WebSocket (Socket.io)
- **Database**: MongoDB + Redis
- **Game Engine**: Phaser 3 or Three.js
- **Styling**: Tailwind CSS

## 📖 Documentation

See detailed documentation in `/docs`:
- [Game Design Document](./docs/GAME_DESIGN.md)
- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Sunnatula Shev** (@sunnatulashev7610)

## 🎮 Status

**Current Phase**: MVP Development

---

*Join us in creating an epic zombie apocalypse survival experience!* 🧟‍♂️🎮