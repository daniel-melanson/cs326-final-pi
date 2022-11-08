import { Building, Event, Room } from "#types";
import { faker } from "@faker-js/faker";

export const rooms: Array<Room> = [];

export const buildings: Array<Building> = [];

export const events: Array<Event> = [];

const buildingCount = faker.datatype.number({
  min: 30,
  max: 75,
});

for (let i = 0; i < buildingCount; i++) {
  const building: Building = {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
  };
  buildings.push(building);

  const roomCount = faker.datatype.number({
    min: 50,
    max: 150,
  });

  for (let j = 0; j < roomCount; j++) {
    const room: Room = {
      building_id: building.id,
      capacity: faker.datatype.number({ min: 10, max: 350 }),
      id: faker.datatype.uuid(),
      number: String(faker.datatype.number({ min: 100, max: 999 })),
    };
    rooms.push(room);

    const eventCount = faker.datatype.number({
      min: 50,
      max: 150,
    });
    for (let k = 0; k < eventCount; k++) {
      const event: Event = {
        id: faker.datatype.uuid(),
        room_id: room.id,
        title: faker.commerce.productName(),
        start_time: faker.date.recent(10).toISOString(),
        end_time: faker.date.recent(10).toISOString(),
      };

      events.push(event);
    }
  }
}
