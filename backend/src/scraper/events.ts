
import Bottleneck from "bottleneck";
import type { Prisma } from '@prisma/client';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import prisma from '../db/index.js';
import { fetchNormalizedBuildings } from './buildings.js';
import { fetchJSON } from './fetchJSON.js';
import { exists, partition, readJSON, writeJSON } from './util.js';

const LIVEURL = 'https://25live.collegenet.com/25live/data/umass/run/list/listdata.json';


const limiter = new Bottleneck({
  minTime: 333
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

export async function syncEvents(pastId: number){
  const rooms = await prisma.room.findFirst({
    where: {
      //capacity : {
      //  gt : 2
      //},
      id : pastId
    },
  }
  );
    console.log(rooms);
    //let liveId = rooms.liveId
    let id = rooms?.liveId ?  rooms.liveId : -1
    console.log(rooms?.liveId)
    if (id === -1){
      console.log(`Error for room: ${rooms?.toString()}`)
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
    const expectedFields = [
      'liveId',
      'title',
      'startTime',
      'endTime',
      'organization',
      'ownerId',
      'roomId'
    ]

    for(let row of json.rows){
      row.itemId
    }
    const event: Prisma.EventCreateInput =  {
      liveId: 0,
      room: {
        connect: ROOM_EVENTS_SEARCH_PARAMS.
      },
      title: "",
      startTime: "",
      endTime: "",
      owner: {
        create: undefined,
        connectOrCreate: undefined,
        connect: undefined
      },
      organization: "",
      type: "",
      categories: "",
      creationDate: "",
      state: ""
    };

    const user = await prisma.event.create({ data: event });
    console.log(json.rows[0])
    }
}
syncEvents();