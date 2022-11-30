
import Bottleneck from "bottleneck";
import { Prisma, PrismaClient } from '@prisma/client';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import prisma from '../db/index.js';
import { fetchNormalizedBuildings } from './buildings.js';
import { fetchJSON } from './fetchJSON.js';
import { exists, partition, readJSON, writeJSON } from './util.js';

const LIVEURL = 'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json';


const limiter = new Bottleneck({
  minTime: 200
});


const ROOM_EVENTS_SEARCH_PARAMS = new URLSearchParams([
  ['compsubject', 'rm_rsrv'],
  ['start_dt', '2022-11-28T00:00:00'],
  ['end_dt', '2022-11-28T23:59:59'],
  ['order', 'asc'],
  ['sort', 'event_name'],
  ['page', '1'],
  ['obj_cache_accl', '0'],
  ['space_id', '94'],
  ['caller', 'pro-ListService.getData'],
]);

 async function addRoomEvents(room : any, owner:any){
    //let liveId = rooms.liveId
    let id = room?.liveId ?  room.liveId : -1
    if (id === -1){
      console.log(`Error for room: ${room?.toString()}`)
    }
    else {
    
      const ROOM_EVENTS_SEARCH_PARAMS = new URLSearchParams([
        ['compsubject', 'rm_rsrv'],
        ['start_dt', '2022-11-28T00:00:00'],
        ['end_dt', '2022-11-28T23:59:59'],
        ['order', 'asc'],
        ['sort', 'event_name'],
        ['page', '1'],
        ['page_size', '10000'],
        ['obj_cache_accl', '0'],
        ['space_id', id.toString()],
        ['caller', 'pro-ListService.getData'],
      ]);

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

      
      if(rows) {
        for(let row of rows){
          const data = row.row;
          const event: Prisma.EventCreateInput =  {
            liveId: data[0]?.itemId,
            room: {connect: room.id},
            title: data[1],
            startTime: new Date(data[8]?.startDate),
            endTime: new Date(data[8]?.endDate),
            owner: {connect : owner.id},
            organization: data[4],
            type: "",
            categories: "",
            creationDate: new Date(),
            state: ""
          };
          //console.log(event)
          const user = await prisma.event.create({ data: event });
        }
      }
    }
    return true
}


export async function syncEvents(){
  const prisma = new PrismaClient

  const rooms  = await prisma.room.findMany(
    {where : 
      {capacity : {gt: 200,}}
    },
    );
  const owner = await prisma.user.findFirst(
    {where : 
      {hash : "123"}
    },
  )
  let roomNumber = 1
  for(let room of rooms){
    const result = await limiter.schedule(() => addRoomEvents(room, owner));
    console.log(`Room ${roomNumber}/${rooms.length} Completed`)
    roomNumber +=1;
  }
}
//createUmassOwner()
syncEvents()


async function createUmassOwner(){
  const prisma = new PrismaClient()

  const owner: Prisma.UserCreateInput = {
    firstName: "U",
    lastName: "Mass",
    email: "umass@umass.edu",
    hash: "123"
  }

   const new_owner = await prisma.user.create({ data: owner })
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