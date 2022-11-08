import { Router } from "express";
import { EVENT_LIST } from "./data";
import { urlBuilder } from "./util";

export const events = Router();

events.get("/:id/", (req, res) => {
  const userURL = urlBuilder("users", req);
  const event = EVENT_LIST.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).end();
  }

  res
    .status(200)
    .json({
      ...event,
      owner_url: userURL(event.owner_id),
    })
    .end();
});
