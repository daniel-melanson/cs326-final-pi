import { Router } from "express";
import { BUILDING_LIST, ROOM_LIST } from "../data/data";
import { urlBuilder } from "./util";

export const buildings = Router();

buildings.get("/", (req, res) => {
  const buildingURL = urlBuilder("buildings", req);
  const roomURL = urlBuilder("rooms", req);

  res
    .status(200)
    .json(
      BUILDING_LIST.map((b) => ({
        ...b,
        url: buildingURL(b.id),
        rooms: ROOM_LIST.filter((r) => r.building_id === b.id).map((r) => ({
          id: r.id,
          number: r.number,
          url: roomURL(r.id),
        })),
      }))
    )
    .end();
});

buildings.get("/:id", (req, res) => {
  const buildingURL = urlBuilder("buildings", req);
  const roomURL = urlBuilder("rooms", req);
  const b = BUILDING_LIST.find((b) => b.id === req.params.id);
  if (!b) {
    return res.status(404).end();
  }

  res
    .status(200)
    .json({
      ...b,
      url: buildingURL(b.id),
      rooms: ROOM_LIST.filter((r) => r.building_id === b.id).map((r) => ({
        id: r.id,
        url: roomURL(r.id),
        number: r.number,
      })),
    })
    .end();
});
