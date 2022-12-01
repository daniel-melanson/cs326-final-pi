import { Router } from 'express';
import prisma from '../db/index.js';
import { serializeBuilding } from '../db/serializers.js';
import { ensureObjectId } from '../middleware/ensureObjectId.js';
import { injectObject } from '../middleware/injectObject.js';
import { objectGETHandler } from './util.js';

export const buildings = Router();

buildings.get('/', async (req, res) => {
  const buildings = await prisma.building.findMany({
    include: {
      rooms: true,
    },
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });

  res.status(200).json(buildings.map((b) => serializeBuilding(req, b)));
});

buildings.get('/:id', ensureObjectId, injectObject('building', { rooms: true }), objectGETHandler('building'));
