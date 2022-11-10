import { Router } from "express";
import { BUILDING_LIST, EVENT_LIST, ROOM_LIST } from "./data";
import { urlBuilder } from "./util";

export const rooms = Router();

rooms.get("/:id/", (req, res) => {
  const buildingURL = urlBuilder("buildings", req);
  const room = ROOM_LIST.find((x) => x.id === req.params.id);
  if (!room) {
    return res.status(404).end();
  }

  const building = BUILDING_LIST.find((b) => b.id === room.building_id);
  if (!building) {
    return res.status(404).end();
  }

  res
    .status(200)
    .json({
      ...room,
      building: {
        url: buildingURL(room.building_id),
        name: building.name,
        id: building.id,
      },
    })
    .end();
});

rooms.get("/:id/events", (req, res) => {
  const events = EVENT_LIST.filter((e) => e.room_id === req.params.id);
  const userURL = urlBuilder("users", req);
  const roomURL = urlBuilder("rooms", req);

  res
    .status(200)
    .json(events.map((e) => ({ ...e, room_url: roomURL(e.room_id), user_url: userURL(e.owner_id) })))
    .end();
});
