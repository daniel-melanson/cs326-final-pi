import type { Prisma } from '@prisma/client';
import { Router } from 'express';
import { body } from 'express-validator';
import { ensureLoggedIn } from '../middleware/ensureLoggedIn.js';
import validate from '../middleware/validate.js';
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
reservations.get('/', ensureLoggedIn, async (req, res) => {
  const user = req.user!
  try {
    const event = await prisma.event.findMany({
      where: { ownerId: user.id },
    });
    return res.status(200).json(event).end();
  } catch (e) {
    return res.status(500).json([]).end();
  }
  // TODO: Return a list of all user created events
});

// UPDATE
reservations.put('/:id', async (req, res) => {
  // TODO: Update a single user with provided updated values
  validate([body('EventId'), body('title'), body('description')])
  const {eventId, title, description} = req.body;
  const user = req.user!;

  const userid = 0;
  const event = await prisma.event.findFirstOrThrow({
    where: { ownerId: user.id, id: eventId },
  });

  const update = await prisma.event.update({
      where: { id: event.id },
      data: {title : title, description: description},
  });

});

// DELETE
reservations.delete('/:id', ensureLoggedIn, async (req, res) => {
  const eventId = req.params['id']
  const user = req.user!;

  try{
  const prisma_user = await prisma.user.findFirstOrThrow({
    where : { id: user.id}
  })
  
  if(eventId){
  const event  = await prisma.event.findFirstOrThrow({
    where : {ownerId : user.id, id: parseInt(eventId)}
  })

  const deleted = await prisma.event.delete({
    where : {id : event.id}
  })
  
  console.log(deleted);
  res.status(200).send(user.id);

 } else {
  throw("EventID Null")
 }
  } catch (e) {
    res.status(500).send("Server Error Parsing Command");
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
