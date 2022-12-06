import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import { body } from 'express-validator';
import { ensureLoggedIn } from 'middleware/ensureLoggedIn.js';
import validate from 'middleware/validate.js';
import prisma from '../db/index.js';

export const reservations = Router();

// CREATE
reservations.post(
  '/',
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
      console.log(e);
      console.log(event);
    }
  },
);

// READ
reservations.get('/', ensureLoggedIn, (req, res) => {
  // TODO: Return a list of all user created events
});

// UPDATE
reservations.put('/:id', async (req, res) => {
  // TODO: Update a single user with provided updated values
  const { ownerId, eventId, title, description } = req.body;
  const user = req.user!;

  const userid = 0;
  const event = await prisma.event.findFirst({
    where: { ownerId: user.id, id: eventId },
  });

  if (event) {
    const update = await prisma.event.update({
      where: { id: event.id },
      data: {},
    });
  }
});

// DELETE
reservations.delete('/:id', ensureLoggedIn, (req, res) => {
  // TODO Delete a user event
  const user = req.user!;
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
