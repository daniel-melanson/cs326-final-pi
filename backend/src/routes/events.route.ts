import { Router } from "express";
import { EVENT_LIST } from "./data";
import { urlBuilder } from "./util";

export const events = Router();

events.get("/:id/", (req, res) => {
  const userURL = urlBuilder("users", req);
  const event = EVENT_LIST.find((e) => e.id === req.params.id);

  res.status(200).json({}).end();
});

events.get("/search?building_id=:building_id", (req, res) => {
  res.status(200).json([]).end();
});
