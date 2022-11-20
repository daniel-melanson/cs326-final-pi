import type { Prisma } from '@prisma/client';
import fetch from 'node-fetch';
import fs from 'node:fs';
import prisma from '../db/index.js';

async function updateEvents() {
  //Get General Info for Events
  /*
  const rawEvents = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=event&end_after=2022-11-13T00:00:00&node_type=E&order=asc&sort=event_name&page=1&page_size=10000&obj_cache_accl=0&state=2+1&caller=pro-ListService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['rows']);

  console.log('Events Request Completed');

  fs.writeFileSync('src\\data\\rawEvents.json', JSON.stringify(rawEvents));

  */

  const rawEvents = JSON.parse(fs.readFileSync('src\\data\\rawEvents.json').toString());

  /*
  const calendarInfo = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/home/calendar/calendardata.json?mode=pro&page_size=10000&obj_cache_accl=0&start_dt=2022-10-04&end_dt=2023-12-04&comptype=cal_event&sort=evdates_event_name&compsubject=event&state=0+1+3+4+99&caller=pro-CalendarService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['root']['events']);

  fs.writeFileSync('src\\data\\calendarInfo.json', JSON.stringify(calendarInfo))
  */

  const calendarInfo = JSON.parse(fs.readFileSync('src\\data\\calendarInfo.json').toString());

  console.log('Calendar Request Completed');

  let addedEvents = 0;
  for (let i = 0; i < rawEvents.length; i++) {
    //Isolate row
    const row = rawEvents[i]['row'];
    const startDate = row[6];
    const calendarTime = calendarInfo.filter((x: any) => x['date'].slice(0, 10) === startDate.slice(0, 10))[0];

    //Get room relation
    console.log(row[10]?.subject?.[0].itemName, addedEvents);
    const room = await prisma.room.findFirst({
      where: { id: row[10]?.subject?.[0].itemName },
      select: { id: true },
    });

    //Get User relation
    const owner = await prisma.user.findUnique({
      where: { id: 1 },
      select: { id: true },
    });

    if (owner && room && calendarTime && calendarTime['rsrv']) {
      const reservationTime = calendarTime['rsrv'].filter((x: any) => x['event_id'] === row[0]['itemId'])[0];

      if (reservationTime && reservationTime['rsrv_start_dt']) {
        const startTime = new Date(reservationTime['rsrv_start_dt']);
        const endTime = new Date(reservationTime['rsrv_end_dt']);

        const event: Prisma.EventCreateInput = {
          liveId: row[0]?.itemId,
          title: row[1],
          organization: row[3]?.subject?.[0].itemName,
          type: row[4],
          categories: row[5],
          creationDate: new Date(row[8]),
          state: row[9],
          startTime: startTime,
          endTime: endTime,
          room: {
            connect: room,
          },
          owner: {
            connect: owner,
          },
        };

        try {
          const user = await prisma.event.create({ data: event });
          addedEvents += 1;
          if (addedEvents % 100 === 0) {
            console.log('Added Events: ', addedEvents);
          }
        } catch (err) {
          console.log(err);
          console.log('room:', row[10]?.subject?.[0].itemName);
          console.log(event);
        }
      }
    } else {
      console.log('fail');
    }
  }

  //fs.writeFileSync("events.json", JSON.stringify(EVENT_LIST));
  console.log('Update Complete');
}

async function updateRooms() {
  //clear previous rooms
  //const clearedEvents = await prisma.event.deleteMany({});
  //const clearedRooms = await prisma.room.deleteMany({});
  //const clearedBuildings = await prisma.building.deleteMany({});

  //console.log("removed rooms", clearedRooms);
  //console.log("removedBuildings", clearedBuildings);

  const rawRooms = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=location&order=asc&sort=max_capacity&page=1&page_size=10000&obj_cache_accl=0&max_capacity=500&caller=pro-ListService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['rows']);

  console.log('Fetched New Data');
  const invalidSplits = [];
  let addedRooms = 0;
  for (let index = 0; index < rawRooms.length; index++) {
    //Simplify Object Structure
    rawRooms[index]['row'][0] = rawRooms[index]['row'][0]['itemName'];
    rawRooms[index] = rawRooms[index]['row'];

    //Try a couple different common splits
    const roomIndex = Math.max(
      rawRooms[index][1].indexOf(' room'),
      rawRooms[index][1].indexOf(' Room'),
      rawRooms[index][1].indexOf(' rm'),
      rawRooms[index][1].indexOf(' Rm'),
      rawRooms[index][1].indexOf(' Lab '),
      rawRooms[index][1].indexOf(' - '),
    );

    //Keep track of invalid splits for future filtering
    if (roomIndex < 0) {
      invalidSplits.push(rawRooms[index][1]);
    } else {
      //Example Arnold House room 120
      const building_id = rawRooms[index][1].slice(0, roomIndex);
      const room_number = rawRooms[index][1]?.slice(roomIndex + ' room'.length).trim();

      const address_beg = 'https://maps.google.com/maps?q=UMass%20Amherst%20';
      const building_param = building_id.replace(' ', '%20');
      const address_end = '&t=&z=16&ie=UTF8&iwloc=&output=embed';

      const building_address = address_beg.concat(building_param, address_end);

      const event: Prisma.RoomCreateInput = {
        id: rawRooms[index][0],
        number: room_number,
        capacity: rawRooms[index][5],
        description: rawRooms[index][3],
        layout: rawRooms[index][4],
        category: rawRooms[index][2],
        building: {
          connectOrCreate: {
            where: {
              id: building_id,
            },
            create: {
              id: building_id,
              name: building_id,
              address: building_address,
            },
          },
        },
      };

      try {
        /*
        const user = await prisma.room.upsert(
          {
          where: {
            id : rawRooms[index][0]
          }, update :{},
          create:
          { data: event },
          });
          */
        const user = await prisma.room.create({ data: event });
        addedRooms += 1;
        if (addedRooms % 100 === 0) {
          console.log('Added Rooms: ', addedRooms);
        }
      } catch (err) {
        console.log(err);
        console.log(event);
      }
    }
  }
  console.log(invalidSplits);

  console.log('Added, ', addedRooms, ' out of a total raw Rooms count of: ', rawRooms.length);
}

//updateRooms();
updateEvents();
