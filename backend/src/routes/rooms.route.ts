import { Router } from "express";
import { EVENT_LIST, ROOM_LIST } from "./data";

export const rooms = Router();

rooms.get("/:id/", (req, res) => {
  res
    .status(200)
    .json(ROOM_LIST.find((x) => x.id === req.params.id))
    .end();
});

rooms.get("/:id/events", (req, res) => {
  res
    .status(200)
    .json(EVENT_LIST.filter((e) => e.room_id === req.params.id))
    .end();
});
