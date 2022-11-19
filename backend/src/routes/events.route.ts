import { Router } from 'express';
import prisma from '../db/index.js';

export const events = Router();

events.get('/:id', async (req, res) => {
  const idString = req.params.id;

  const id = Number(idString);
  if (isNaN(id)) {
    return res.status(400).end();
  }

  try {
    const event = await prisma.event.findFirst({
      where: { id },
    });

    if (event) {
      return res.status(200).json(event).end();
    } else {
      return res.status(404).end();
    }
  } catch (e) {
    return res.status(500).end();
  }
});
