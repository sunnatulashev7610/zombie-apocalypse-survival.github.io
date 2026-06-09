# Architecture Guide

## Project Layout

- `frontend/` - React + TypeScript game client using Vite and Socket.IO client.
- `backend/` - Node.js server using Express and Socket.IO for real-time multiplayer.
- `docs/` - Design and API documentation.
- `assets/` - Placeholder directory for future images, sprites, and audio.
- `.gitignore` - Files and directories excluded from version control.

## Client Responsibilities

- Render top-down game view on HTML canvas.
- Manage player input and UI for class selection, inventory, and abilities.
- Connect to the backend over WebSocket and receive `stateUpdate` events.
- Display live player, zombie, and zone state.

## Server Responsibilities

- Maintain authoritative game state for players and enemies.
- Spawn AI enemies based on the active map region.
- Process player movement and ability usage.
- Broadcast regular updates to all connected clients.

## Game Systems

- Multiplayer matchmaking supports 2-8 players per session.
- Combat includes real-time enemy chase, damage resolution, and abilities.
- Zones are designed with unique mechanics and escalating difficulty.
- Progression is tracked by XP, level, and inventory.
