# API Documentation

## WebSocket Events

### Client -> Server

- `joinMatch`
  - Payload: `{ name: string, classId: 'soldier' | 'medic' | 'scout' | 'engineer' }`
  - Description: Join the current match with a player name and selected class.

- `playerMove`
  - Payload: `{ x: number, y: number }`
  - Description: Send directional movement input from the client.

- `useAbility`
  - Payload: `{ ability: string }`
  - Description: Activate the selected class ability.

### Server -> Client

- `joined`
  - Payload: `{ id: string, state: SessionState }`
  - Description: Confirmation that the player joined the session.

- `stateUpdate`
  - Payload: `SessionState`
  - Description: Broadcast of the current match state for real-time rendering.

- `log`
  - Payload: `string`
  - Description: Match event messages such as player joins, enemy spawns, and combat events.
