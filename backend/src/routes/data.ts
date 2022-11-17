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

async function updateEvents(){
  let finaldic = [];
 
  //Get General Info for Events
  let rawEvents = await fetch(
  'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=event&end_after=2022-11-13T00:00:00&node_type=E&order=asc&sort=event_name&page=1&page_size=25&obj_cache_accl=0&state=2+1&caller=pro-ListService.getData'
  ).then( (response) => response.text()).then((data) =>  JSON.parse(data.slice(5))['rows']);

  console.log("Events Request Completed")

  
  let calendarInfo = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/home/calendar/calendardata.json?mode=pro&page_size=2500&obj_cache_accl=0&start_dt=2022-10-04&end_dt=2022-12-04&comptype=cal_event&sort=evdates_event_name&compsubject=event&state=0+1+3+4+99&caller=pro-CalendarService.getData'
  ).then( (response) => response.text()).then((data) =>  JSON.parse(data.slice(5))['root']['events']);
  

  // let calendarInfo = JSON.parse(fs.readFileSync('calendarInfo.json')); -debugging faster.

  console.log("Calendar Request Completed")

  for(let i = 0; i < rawEvents.length; i++){
    let row = rawEvents[i]['row'];
    let event = {}

    event['eventID'] = row[0]['itemId']; //retain class ID
    event['eventTitle'] = row[1];
    event['referenceID'] = row[2];
    event['organization']= row[3]['subject'][0]['itemName']; // simplify to Organization string
    event['type'] = row[4];
    event['categories'] = row[5];
    event['startDate'] = row[6];
    event['creationDate'] = row[8];

    let x = event['startDate'].slice(0,10);

    //Just get cal
    let calendarTime = calendarInfo.filter((x) => x['date'].slice(0,10) === event['startDate'].slice(0,10))[0];
    if(calendarTime && calendarTime['rsrv']){
      let reservationTime = calendarTime['rsrv'].filter((x) => x['event_id'] === event['eventID'])[0];
      if(reservationTime && reservationTime['rsrv_start_dt']) {
      event['startTime'] = reservationTime['rsrv_start_dt'];
      event['endTime'] = reservationTime['rsrv_end_dt'];
      }
    }
    event['state'] = row[9];
    event['room_id'] = row[10]['subject'][0]['itemName']; //simplify to room string
    event['scheduler'] = row[12];
    event['requester'] = row[13];
    finaldic.push(event);
  }
  
  fs.writeFileSync("data.json", JSON.stringify(finaldic))

  console.log("Update Complete")
}

async function updateRooms(){

let finalRooms = []; // Try to get the Room interface implemented

let rawRooms = await fetch (
   'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=location&order=asc&sort=max_capacity&page=1&page_size=10000&obj_cache_accl=0&max_capacity=500&caller=pro-ListService.getData'
).then( (response) => response.text()).then((data) => JSON.parse(data.slice(5))['rows'])
for(let index = 0; index < rawRooms.length; index++){
  rawRooms[index]['row'][0] = rawRooms[index]['row'][0]['itemName']
  rawRooms[index] =  rawRooms[index]['row']

  let room = {};

  room['id'] = rawRooms[index][0];
  room['title'] = rawRooms[index][1];
  room['category'] = rawRooms[index][2];
  room['description'] = rawRooms[index][3];
  room['layout'] = rawRooms[index][4];
  room['capacity'] = rawRooms[index][5];

  finalRooms.push(room);
}
fs.writeFileSync("data.json", JSON.stringify(finalRooms))
}

