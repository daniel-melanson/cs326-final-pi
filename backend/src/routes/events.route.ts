import { Router } from 'express';
import { body } from 'express-validator';
import prisma from '../db/index.js';
import validate from '../middleware/validate.js';

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

// TODO check if user in authenticated
events.post(
  '/',
  validate([
    body('roomId').isString().isLength({ min: 5 }),
    body('title').isString().isLength({ min: 5, max: 64 }),
    body('startTime').isDate(),
    body('endTime').isDate(),
  ]),
  async (req, res) => {
    const { roomId, title, startTime, endTime } = req.body;

    try {
      const event = await prisma.event.create({
        data: {
          id: 1,
          room: {
            connect: {
              id: roomId,
            },
          },
          title: title,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          owner: {
            connect: {
              id: 0, // TODO: use authenticated user
            },
          },
          organization: '', // TODO: Drop, make optional, or use defaults
          type: '',
          categories: '',
          creationDate: new Date(),
          state: '',
        },
      });

      return res.status(200).json(event).end();
    } catch (e) {
      return res.status(500).end();
    }
  },
);
