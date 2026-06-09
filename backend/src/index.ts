import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { createGameServer } from './game/server.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const gameServer = createGameServer(io);

gameServer.start();

const port = Number(process.env.PORT || 5000);
server.listen(port, () => {
  console.log(`Zombie server listening on http://localhost:${port}`);
});
