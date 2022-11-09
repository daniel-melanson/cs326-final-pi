import { Building, Event, Room, User } from "#types";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

export let ROOM_LIST: Array<Room> = [];

export let BUILDING_LIST: Array<Building> = [];

export let EVENT_LIST: Array<Event> = [];

export const USER_LIST: Array<User> = [];
const dataPath = path.join(process.cwd(), "./fake_data.json");
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, { encoding: "utf-8" }));
  ROOM_LIST = data.ROOM_LIST;
  BUILDING_LIST = data.BUILDING_LIST;
  EVENT_LIST = data.EVENT_LIST;
} else {
  generateData();

  fs.writeFileSync(
    dataPath,
    JSON.stringify({
      ROOM_LIST,
      BUILDING_LIST,
      EVENT_LIST,
    })
  );
}

function generateData() {
  const buildingCount = faker.datatype.number({
    min: 30,
    max: 75,
  });

  for (let i = 0; i < buildingCount; i++) {
    const building: Building = {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
    };
    BUILDING_LIST.push(building);

    const roomCount = faker.datatype.number({
      min: 10,
      max: 50,
    });

    for (let j = 0; j < roomCount; j++) {
      const room: Room = {
        building_id: building.id,
        capacity: faker.datatype.number({ min: 10, max: 350 }),
        id: faker.datatype.uuid(),
        number: String(faker.datatype.number({ min: 100, max: 300 })),
      };
      ROOM_LIST.push(room);

      const eventCount = faker.datatype.number({
        min: 50,
        max: 100,
      });

      for (let k = 0; k < eventCount; k++) {
        let user: User;
        if (USER_LIST.length > 0 && Math.random() > 0.5) {
          user = faker.helpers.arrayElement(USER_LIST);
        } else {
          user = {
            name: faker.name.fullName(),
            id: faker.datatype.uuid(),
          };

          USER_LIST.push(user);
        }

        const event: Event = {
          id: faker.datatype.uuid(),
          owner_id: user.id,
          room_id: room.id,
          title: faker.commerce.productName(),
          start_time: faker.date.recent(10).toISOString(),
          end_time: faker.date.recent(10).toISOString(),
        };

        EVENT_LIST.push(event);
      }
    }
  }
}
