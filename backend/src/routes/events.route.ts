import { Router } from 'express';
import { ensureObjectId } from '../middleware/ensureObjectId.js';
import { injectObject } from '../middleware/injectObject.js';
import { objectGETHandler } from './util.js';

export const events = Router();

events.get('/:id', ensureObjectId, injectObject('event', { room: true }), objectGETHandler('event'));
