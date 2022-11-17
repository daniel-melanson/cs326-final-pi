import { Building, Event, Room, User } from "#types";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { stringify } from "querystring";

export const ROOM_LIST: Array<Room> = [];

export const BUILDING_LIST: Array<Building> = [];

export const EVENT_LIST: Array<Event> = [];

/*
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

*/

/*
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

*/

async function updateEvents() {
  //Get General Info for Events
  const rawEvents = await fetch(
    "https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=event&end_after=2022-11-13T00:00:00&node_type=E&order=asc&sort=event_name&page=1&page_size=25&obj_cache_accl=0&state=2+1&caller=pro-ListService.getData"
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))["rows"]);

  console.log("Events Request Completed");

  const calendarInfo = await fetch(
    "https://25live.collegenet.com/25live/data/umass/run/home/calendar/calendardata.json?mode=pro&page_size=2500&obj_cache_accl=0&start_dt=2022-10-04&end_dt=2022-12-04&comptype=cal_event&sort=evdates_event_name&compsubject=event&state=0+1+3+4+99&caller=pro-CalendarService.getData"
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))["root"]["events"]);

  // let calendarInfo = JSON.parse(fs.readFileSync('calendarInfo.json')); -debugging faster.

  console.log("Calendar Request Completed");

  for (let i = 0; i < rawEvents.length; i++) {
    const row = rawEvents[i]["row"];
    const startDate = row[6];
    const calendarTime = calendarInfo.filter((x: any) => x["date"].slice(0, 10) === startDate.slice(0, 10))[0];

    const event: Event = {
      id: row[0]["itemId"],
      title: row[1],
      reference_id: row[2],
      organization: row[3]["subject"][0]["itemName"],
      type: row[4],
      categories: row[5],
      creation_date: row[8],
      state: row[9],
      room_id: row[10]["subject"][0]["itemName"],
      owner_id: 1,
      start_time: "",
      end_time: "",
    };

    //Just get cal

    if (calendarTime && calendarTime["rsrv"]) {
      const reservationTime = calendarTime["rsrv"].filter((x: any) => x["event_id"] === row[0]["itemId"])[0];
      if (reservationTime && reservationTime["rsrv_start_dt"]) {
        event["start_time"] = reservationTime["rsrv_start_dt"];
        event["end_time"] = reservationTime["rsrv_end_dt"];
      }
    }
    EVENT_LIST.push(event);
  }

  fs.writeFileSync("data.json", JSON.stringify(EVENT_LIST));

  console.log("Update Complete");
}

async function getBuildingAddress(building: string){
  const param = "https://spire-api.melanson.dev/buildings/?search=" + building.replace(" ", "+");
  //console.log(param);
  const address = await fetch(param)
    .then((response) => response.json())
    .then((data) => {
      console.log(data["results"][0])
      return data["results"][0]["address"]
    });
  return address;
}


async function updateRooms() {

  const rawRooms = await fetch(
    "https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=location&order=asc&sort=max_capacity&page=1&page_size=10000&obj_cache_accl=0&max_capacity=500&caller=pro-ListService.getData"
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))["rows"]);

  const buildings = new Map<string, string>();

  for (let index = 0; index < rawRooms.length; index++) {
    rawRooms[index]["row"][0] = rawRooms[index]["row"][0]["itemName"];
    rawRooms[index] = rawRooms[index]["row"];

    const room: Room = {
      id: rawRooms[index][0],
      building_id: "",
      number: "",
      capacity: rawRooms[index][5],
      description: rawRooms[index][3],
      layout: rawRooms[index][4],
      address: "",
      title: rawRooms[index][1],
      category: rawRooms[index][2],
    };

    const roomIndex = room["title"].indexOf(" room");

    if (roomIndex > 0) {
      room["building_id"] = room["title"].slice(0, roomIndex);
      room["number"] = room["title"].slice(roomIndex + " room".length).trim();

      if (buildings.has(room["building_id"])) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        room["address"] = buildings.get(room["building_id"])!;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getBuildingAddress(room["building_id"])
          .then((address) => {
            console.log(address);
            buildings.set(room["building_id"], address);
          })
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .then(() => (room["address"] = buildings.get(room["building_id"])!));
      }
    }

    ROOM_LIST.push(room);
  }
  fs.writeFileSync("data.json", JSON.stringify(ROOM_LIST));
}

updateRooms();
