import { Router } from "express";

export const rooms = Router();

rooms.get("/:id/", (req, res) => {
  res.status(404).end();
});

rooms.get("/:id/events", (req, res) => {
  res.status(404).end();
});
