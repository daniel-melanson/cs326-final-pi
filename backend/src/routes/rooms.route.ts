import { Router } from 'express';
import { serializeEvent, serializeEventField } from '../db/serializers.js';
import { ensureObjectId } from '../middleware/ensureObjectId.js';
import { injectObject } from '../middleware/injectObject.js';
import { objectGETHandler } from './util.js';

export const rooms = Router();

rooms.get('/:id/', ensureObjectId, injectObject('room', { building: true }), objectGETHandler('room'));

rooms.get('/:id/events', ensureObjectId, injectObject('room', { Event: true }), async (req, res) => {
  res.status(200).json((req.room as any).Event.map((e: any) => serializeEventField(req, e)));
});
