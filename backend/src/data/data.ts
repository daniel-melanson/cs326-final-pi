import { Prisma } from '@prisma/client';
import fs from 'fs';
import fetch from 'node-fetch';
import prisma from '../db/index.js';

async function updateEvents() {
  //Get General Info for Events
  const rawEvents = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=event&end_after=2022-11-13T00:00:00&node_type=E&order=asc&sort=event_name&page=1&page_size=10000&obj_cache_accl=0&state=2+1&caller=pro-ListService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['rows']);

  console.log('Events Request Completed');

  const calendarInfo = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/home/calendar/calendardata.json?mode=pro&page_size=10000&obj_cache_accl=0&start_dt=2022-10-04&end_dt=2023-12-04&comptype=cal_event&sort=evdates_event_name&compsubject=event&state=0+1+3+4+99&caller=pro-CalendarService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['root']['events']);

  // let calendarInfo = JSON.parse(fs.readFileSync('calendarInfo.json')); -debugging faster.

  console.log('Calendar Request Completed');

  for (let i = 0; i < rawEvents.length; i++) {
    const row = rawEvents[i]['row'];
    const startDate = row[6];
    const calendarTime = calendarInfo.filter(
      (x: any) => x['date'].slice(0, 10) === startDate.slice(0, 10),
    )[0];

    let room = await prisma.room.findUnique({
      where: { id: row[10]?.subject?.[0].itemName },
      select: { id: true },
    });

    if (!room) {
      room = { id: 'UNKOWN' };
    }

    let owner = await prisma.user.findUnique({
      where: { id: 1 },
      select: { id: true },
    });

    if (!owner) {
      owner = { id: 1 };
    }

    const event: Prisma.EventCreateInput = {
      id: row[0]?.itemId,
      title: row[1],
      organization: row[3]?.subject?.[0].itemName,
      type: row[4],
      categories: row[5],
      creationDate: row[8],
      state: row[9],
      startTime: '',
      endTime: '',
      room: {
        connect: room,
      },
      owner: {
        connect: owner,
      },
    };

    //Just get cal
    if (calendarTime && calendarTime['rsrv']) {
      const reservationTime = calendarTime['rsrv'].filter(
        (x: any) => x['event_id'] === row[0]['itemId'],
      )[0];
      if (reservationTime && reservationTime['rsrv_start_dt']) {
        event['startTime'] = reservationTime['rsrv_start_dt'];
        event['endTime'] = reservationTime['rsrv_end_dt'];
      }
    }

    const user = await prisma.event.create({ data: event });
  }

  //fs.writeFileSync("events.json", JSON.stringify(EVENT_LIST));
  console.log('Update Complete');
}

async function updateRooms() {
  const rawRooms = await fetch(
    'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?compsubject=location&order=asc&sort=max_capacity&page=1&page_size=10000&obj_cache_accl=0&max_capacity=500&caller=pro-ListService.getData',
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data.slice(5))['rows']);


  const list = [];
  const roomList = [];

  for (let index = 0; index < rawRooms.length; index++) {
    rawRooms[index]['row'][0] = rawRooms[index]['row'][0]['itemName'];
    rawRooms[index] = rawRooms[index]['row'];

    const room = {
      id: rawRooms[index][0],
      building_id: '',
      number: '',
      capacity: rawRooms[index][5],
      description: rawRooms[index][3],
      layout: rawRooms[index][4],
      address: '',
      title: rawRooms[index][1],
      category: rawRooms[index][2],
    };

    const roomIndex = room['title'].indexOf(' room');

    if (roomIndex > 0) {
      room['building_id'] = room['title'].slice(0, roomIndex);
      room['number'] = room['title'].slice(roomIndex + ' room'.length).trim();

      if (list.indexOf(room['building_id']) < 0) {
        list.push(room['building_id']);
      }

      const address_beg = 'https://maps.google.com/maps?q=UMass%20Amherst%20';
      const building_param = room['building_id'].replace(' ', '%20');
      const address_end = '&t=&z=16&ie=UTF8&iwloc=&output=embed';

      room['address'] = address_beg.concat(building_param, address_end);
    }

    roomList.push(room);
  }
  fs.writeFileSync('rooms.json', JSON.stringify(roomList));
  fs.writeFileSync('building.json', JSON.stringify(list));
}

updateEvents();

///updateRooms();
