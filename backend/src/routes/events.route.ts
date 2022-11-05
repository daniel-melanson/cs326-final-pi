import { Router } from "express";

export const events = Router();

events.get("/:room_id/", (req, res) => {
  res.status(200).json([]).end();
});
