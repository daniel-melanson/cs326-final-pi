import { Router } from 'express';
import { ensureObjectId } from '../middleware/ensureObjectId.js';
import { injectObject } from '../middleware/injectObject.js';
import { rooms } from './rooms.route.js';
import { objectGETHandler } from './util.js';
import prisma from '../db/index.js';
import type { Prisma } from '@prisma/client';
import { receiveMessageOnPort } from 'worker_threads';

export const reservation = Router();

reservation.get('/delete')

reservation.get('/update', async (req, res) => {
  const {ownerId, eventId, title, description} = req.body;
  const {email} = req.user.id;

  const user = await prisma.user.findFirst({
    where : { email : email}
  }

  );
 
  if(user){
    const userid = 0
    const event  = await prisma.event.findFirst({
      where : {ownerId : user.id, id: eventId}
    })
      if(event){
      const update = await prisma.event.update({
        where : {id: event.id},
        data:{

        }
      });
  }
  } else {
    res.status(500).send("User Not Found")
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
reservation.get('/create', async (req, res) => {
    const {roomId, title, description, startTime, endTime, ownerId} = req.body;

    const event : Prisma.EventCreateInput = {
        liveId: 0,
        room: {
            connect: {id:roomId}
        },
        title: title,
        startTime: startTime,
        endTime: endTime,
        owner: {
            connect: {id:ownerId}
        },
        organization: '',
        creationDate: new Date(),
        description: description
    }
    
    try {
        const user = await prisma.event.create({ data: event });
        res.status(200).send();
      } catch (e) {
        res.status(401).send("Error submitting input to database")
        console.log(e);
        console.log(event);
      }
    });


