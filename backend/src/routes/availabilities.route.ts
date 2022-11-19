import { Router } from 'express';

export const availabilities = Router();

availabilities.get('/', (req, res) => {
  res.status(404).end();
});
