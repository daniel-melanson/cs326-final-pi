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

// async function updateEvents() {
//   const finaldic = [];
//   let x = "";
//   //Get General Info for Events
//   await fetch(
//     "https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=event&end_after=2022-11-13T00:00:00&node_type=E&order=asc&sort=event_name&page=1&page_size=25&obj_cache_accl=0&state=2+1&caller=pro-ListService.getData"
//   )
//     .then(response => response.text())
//     .then(data => (x = JSON.parse(data.slice(5))))
//     .then(() => x);

//   //Get Calendar Info for events.
//   // https://25live.collegenet.com/25live/data/umass/run/home/calendar/calendardata.json?mode=pro&page_size=2500&obj_cache_accl=0&start_dt=2022-10-04&end_dt=2022-10-04&comptype=cal_event&sort=evdates_event_name&compsubject=event&state=0+1+3+4+99&caller=pro-CalendarService.getData

//   //Get room information
//   //https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=location&order=asc&sort=max_capacity&page=1&page_size=100&obj_cache_accl=0&max_capacity=500&caller=pro-ListService.getData
//   for (let i = 0; i < x.rows.length; i++) {
//     const row = x.rows[i].row;
//     row[0] = row[0]["itemId"]; //retain class ID
//     row[3] = row[3]["subject"][0]["itemName"]; // simplify to Organization string
//     row[10] = row[10]["subject"][0]["itemName"]; //simplify to room string
//     row[11] = "";
//     finaldic.push(row);
//   }

//   fs.writeFileSync("data.json", JSON.stringify(finaldic));
// }

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
        description: faker.commerce.productDescription(),
        building_id: building.id,
        capacity: faker.datatype.number({ min: 10, max: 350 }),
        id: faker.datatype.uuid(),
        number: String(faker.datatype.number({ min: 100, max: 300 })),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}`,
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
