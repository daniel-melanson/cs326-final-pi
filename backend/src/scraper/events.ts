import { Prisma, PrismaClient } from '@prisma/client';
import Bottleneck from 'bottleneck';
import prisma from '../db/index.js';
import { fetchJSON } from './fetchJSON.js';

const limiter = new Bottleneck({
  minTime: 200,
});

async function addRoomEvents(room: any, owner: any) {
  //let liveId = rooms.liveId
  let id = room?.liveId ? room.liveId : -1;
  if (id === -1) {
    console.log(`Error for room: ${room?.toString()}`);
  } else {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 7);
    const string_end = endDate.toISOString();
    const string_currentDate = currentDate.toISOString();

    const ROOM_EVENTS_SEARCH_PARAMS = new URLSearchParams([
      ['compsubject', 'rm_rsrv'],
      ['start_dt', string_currentDate],
      ['end_dt', string_end],
      ['order', 'asc'],
      ['sort', 'event_name'],
      ['page', '1'],
      ['page_size', '10000'],
      ['obj_cache_accl', '0'],
      ['space_id', id.toString()],
      ['caller', 'pro-ListService.getData'],
    ]);

    try {
      const EVENTS_URL = `https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?${ROOM_EVENTS_SEARCH_PARAMS.toString()}`;
      const json = await fetchJSON(EVENTS_URL);
      const columnMeta = json.cols;
      const rows = json.rows;

      //console.log(columnMeta)
      /*
      [0] name: Event - asc order
      [1] name: Title
      [2] name: Reference
      [3] name: Expected Head Count
      [4] name: Organization
      [5] name: Occurrance Date - date
      [6] name: Setup Start
      [7] name: Pre-Event Start
      [8] name: Event Times
      [9] name: Post-Event End
      [10] name: Takedown End
      */

      if (rows) {
        for (let row of rows) {
          const data = row.row;
          const event: Prisma.EventCreateInput = {
            liveId: data[0]?.itemId,
            room: { connect: { id: room.id } },
            title: data[1],
            startTime: new Date(data[8]?.startDate),
            endTime: new Date(data[8]?.endDate),
            owner: { connect: { id: owner.id } },
            organization: data[4],
            creationDate: new Date(),
          };
          //console.log(event)
          try {
            const user = await prisma.event.create({ data: event });
          } catch (e) {
            console.log(e);
            console.log(data);
            console.log(event);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  return true;
}

export async function syncEvents() {
  const prisma = new PrismaClient();

  const rooms = await prisma.room.findMany();
  const cleared = await prisma.event.deleteMany({ where: { ownerId: 1 } });
  const owner = await prisma.user.findFirst({ where: { hash: '123' } });
  let roomNumber = 1;
  for (let room of rooms) {
    const result = await limiter.schedule(() => addRoomEvents(room, owner));
    console.log(`Room ${roomNumber}/${rooms.length} Completed`);
    roomNumber += 1;
  }
}
//createUmassOwner()
syncEvents();

async function createUmassOwner() {
  const prisma = new PrismaClient();

  const owner: Prisma.UserCreateInput = {
    firstName: 'U',
    lastName: 'Mass',
    email: 'umass@umass.edu',
    hash: '123',
  };

  const new_owner = await prisma.user.create({ data: owner });
}

/*
model User {
  id        Int     @id @default(autoincrement())
  firstName String  @db.VarChar(64)
  lastName  String  @db.VarChar(64)
  email     String  @unique
  hash      String
  Events    Event[]
}

*/
