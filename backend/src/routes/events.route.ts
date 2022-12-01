import { Router } from 'express';
import { body } from 'express-validator';
import { ensureObjectId } from '../middleware/ensureObjectId.js';
import { injectObject } from '../middleware/injectObject.js';
import validate from '../middleware/validate.js';
import { objectGETHandler } from './util.js';

export const events = Router();

events.get('/:id', ensureObjectId, injectObject('event', { room: true }), objectGETHandler('event'));

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
      // const event = await prisma.event.create({
      //   data: {
      //     room: {
      //       connect: {
      //         id: roomId,
      //       },
      //     },
      //     title: title,
      //     startTime: new Date(startTime),
      //     endTime: new Date(endTime),
      //     owner: {
      //       connect: {
      //         id: 0, // TODO: use authenticated user
      //       },
      //     },
      //     organization: '', // TODO: Drop, make optional, or use defaults
      //     type: '',
      //     categories: '',
      //     creationDate: new Date(),
      //     state: '',
      //   },
      // });

      return res.status(200).json({});
    } catch (e) {
      return res.status(500).json({ errors: [] });
    }
  },
);
