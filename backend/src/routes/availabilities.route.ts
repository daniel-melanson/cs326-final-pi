import { Router } from 'express';

export const availabilities = Router();

availabilities.get('/', (req, res) => {
  res.status(200).json([]).end();
});
