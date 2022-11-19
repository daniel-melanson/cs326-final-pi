import { Router } from 'express';
import prisma from '../db/index.js';

export const rooms = Router();

rooms.get('/:id/', async (req, res) => {
  const { id } = req.params;

  try {
    const room = await prisma.room.findFirst({ where: { id } });

    if (room) {
      return res.status(200).json(room).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return res.status(500).end();
  }
});

rooms.get('/:id/events', async (req, res) => {
  const { id } = req.params;

  try {
    const room = await prisma.room.findFirst({ where: { id } });
    if (room) {
      const events = await prisma.event.findMany({
        where: {
          roomId: room.id,
        },
      });

      return res.status(200).json(events).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return res.status(500).end();
  }
});
