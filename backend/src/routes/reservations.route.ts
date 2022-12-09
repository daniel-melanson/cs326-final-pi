import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import { body } from 'express-validator';
import prisma from '../db/index.js';
import { serializeEvent } from '../db/serializers.js';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';
import validate from '../middleware/validate.js';

export const reservations = Router();

// CREATE
reservations.post(
  '/', ensureLoggedIn,
  validate([body('roomId'), body('title'), body('startTime'), body('endTime')]),
  async (req, res) => {
    // TODO: Create a user event
    const { roomId, title, description, startTime, endTime, ownerId } = req.body;

    const event: Prisma.EventCreateInput = {
      liveId: 0,
      room: {
        connect: { id: roomId },
      },
      title: title,
      startTime: startTime,
      endTime: endTime,
      owner: {
        connect: { id: ownerId },
      },
      organization: '',
      creationDate: new Date(),
      description: description,
    };

    try {
      const user = await prisma.event.create({ data: event });
      res.status(200).send();
    } catch (e) {
      res.status(401).send('Error submitting input to database');
    }
  },
);

// READ
reservations.get('/', ensureLoggedIn, async (req, res) => {
  const user = req.user!;
  try {
    const events = await prisma.event.findMany({
      where: { ownerId: user.id },
      include: {
        room: {
          include: {
            building: true
          }
        }
      }
    });

    return res.status(200).json(events.map(e => serializeEvent(req, e)));
  } catch (e) {
    return res.status(500).json([]).end();
  }
  // TODO: Return a list of all user created events
});

// UPDATE
reservations.put('/:id', ensureLoggedIn, async (req, res) => {
  // TODO: Update a single user with provided updated values
  validate([body('EventId'), body('title'), body('description')]);
  const { eventId, title, description } = req.body;
  const user = req.user!;

  try {
    const event = await prisma.event.findFirstOrThrow({
      where: { ownerId: user.id, id: eventId },
    });

    const update = await prisma.event.update({
      where: { id: event.id },
      data: { title: title, description: description },
    });

    res.status(200).json(update).end();
  } catch (e) {
    res.status(500).end();
  }
});

// DELETE
reservations.delete('/:id', ensureLoggedIn, async (req, res) => {
  const eventId = req.params['id'];
  const user = req.user!;

  try {
    if (eventId) {
      const event = await prisma.event.findFirstOrThrow({
        where: { ownerId: user.id, id: parseInt(eventId) },
      });
      if(user.id !== event.ownerId){
        throw(401)
      }

      const deleted = await prisma.event.delete({
        where: { id: event.id },
      });

      res.status(200).json(deleted);
    } else {
      throw new Error('EventID Null');
    }
  } catch (e) {
    res.status(500).send('Server Error Parsing Command');
  }
});

/*
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})

*/
