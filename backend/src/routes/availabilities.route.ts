import { RESTfulAvailability } from "#types";
import { faker } from "@faker-js/faker";
import { Router } from "express";
import { BUILDING_LIST, ROOM_LIST } from "./data";
import { urlBuilder } from "./util";

export const availabilities = Router();

availabilities.get("/", (req, res) => {
  const { building_id, room_id, capacity, date_iso, duration, sort } = req.query;

  if (!date_iso) {
    return res.status(400).end();
  }

  if (![building_id, room_id, capacity, duration, sort].every((x) => ["string", "undefined"].includes(typeof x)))
    return res.status(400).end();

  const date = new Date(new Date(date_iso as string).toDateString());
  const buildingURL = urlBuilder("buildings", req);
  const roomURL = urlBuilder("rooms", req);
  const results: RESTfulAvailability[] = [];

  const scheduleStart = new Date(date.setHours(8));
  const scheduleEnd = new Date(date.setHours(20));

  const count = faker.datatype.number({ min: 5, max: 15 });
  for (let i = 0; i < count; i++) {
    const b = BUILDING_LIST.find((b) => b.id === building_id) ?? faker.helpers.arrayElement(BUILDING_LIST);
    const r = faker.helpers.arrayElement(ROOM_LIST.filter((r) => r.building_id === b.id));

    const eventStart = faker.date.between(scheduleStart, scheduleEnd);
    results.push({
      building: {
        name: b.name,
        url: buildingURL(b.id),
      },
      room: {
        id: r.id,
        number: r.number,
        url: roomURL(r.id),
      },
      start: eventStart.toISOString(),
      end: faker.date
        .between(
          eventStart,
          new Date(
            eventStart.setHours(eventStart.getHours() + faker.datatype.number({ min: 0.5, max: 2.5, precision: 0.5 }))
          )
        )
        .toISOString(),
    });
  }

  res.status(200).json(results).end();
});
