import { Router } from 'express';

export const events = Router();

events.get('/:id/', (req, res) => {
  res.status(404).end();
});

events.post('/', (req, res) => {
  res.status(404).end();
});
