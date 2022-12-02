/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Prisma } from '@prisma/client';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import prisma from '../db/index.js';
import { fetchNormalizedBuildings } from './buildings.js';
import { fetchJSON } from './fetchJSON.js';
import { exists, partition, readJSON, writeJSON } from './util.js';

const ROOMS_URL_PARAMS = new URLSearchParams([
  ['compsubject', 'location'],
  ['order', 'asc'],
  ['sort', 'max_capacity'],
  ['page', '1'],
  ['page_size', '10000'],
  ['obj_cache_accl', '0'],
  ['max_capacity', '500'],
  ['caller', 'pro-ListService.getData'],
]);

const ROOMS_URL = `https://25live.collegenet.com/25live/data/umass/run/list/listdata.json?${ROOMS_URL_PARAMS.toString()}`;

interface RawRoomDetails {
  templateType: number;
  itemId: number;
  itemName: string;
  itemTypeId: number;
}

interface RawRoom {
  details: RawRoomDetails;
  name: string;
  categories: string;
  features: string;
  layouts: string;
  maxCapacity: number;
  defaultCapacity: number;
}

interface NormalizedRoom {
  raw: RawRoom;
  building: {
    name: string;
    address: string;
  } | null;
  number: string | null;
  alt: string;
}

async function fetchRawRooms(): Promise<RawRoom[]> {
  const json = await fetchJSON(ROOMS_URL);

  const rows = json.rows.map((r: any) => r.row);
  const columnMeta = json.cols;
  const expectedFields = [
    'name',
    'formal_name',
    'categories',
    'features',
    'layouts',
    'max_capacity',
    'default_capacity',
  ];
  assert(expectedFields.every((prefname, i) => columnMeta[i].prefname === prefname));

  return rows.map((row: any) => {
    return {
      details: row[0],
      name: String(row[1]).trim(),
      categories: String(row[2]).trim(),
      features: String(row[3]),
      layouts: String(row[4]),
      maxCapacity: row[5],
      defaultCapacity: row[6],
    } as RawRoom;
  });
}

export async function syncRooms() {
  if (!exists('NORMALIZED_BUILDINGS')) {
    writeJSON('NORMALIZED_BUILDINGS', await fetchNormalizedBuildings());
  }

  let rawRooms: RawRoom[];
  if (exists('RAW_ROOMS')) {
    rawRooms = readJSON('RAW_ROOMS');
  } else {
    rawRooms = await fetchRawRooms();
    rawRooms.sort((a, b) => a.name.localeCompare(b.name));
    writeJSON(
      'RAW_ROOMS',
      rawRooms.filter((r) => r.name.length > 0),
    );
  }

  execSync('python3 ./src/scraper/normalize_rooms.py'); // lol
  const normalizedRooms: NormalizedRoom[] = readJSON('NORMALIZED_ROOMS');

  const [passed, failed] = partition(normalizedRooms, (r) => {
    const buildingName = r.building?.name;

    return (
      r.building &&
      r.number &&
      r.building.address &&
      buildingName &&
      !buildingName.includes('Mount Ida') &&
      !buildingName.includes('at Springfield')
    );
  });

  writeJSON('IGNORED', failed);

  for (const normRoom of passed) {
    const building = await prisma.building.upsert({
      where: {
        name: normRoom.building!.name,
      },
      update: {
        address: normRoom.building!.address,
      },
      create: {
        name: normRoom.building!.name,
        address: normRoom.building!.address,
      },
    });

    const roomFields: Prisma.RoomCreateInput = {
      building: {
        connect: {
          id: building.id,
        },
      },
      liveId: normRoom.raw.details.itemId,
      number: normRoom.number!,
      capacity: normRoom.raw.maxCapacity,
      features: normRoom.raw.features,
    };

    const room = await prisma.room.upsert({
      where: {
        liveId: normRoom.raw.details.itemId,
      },
      update: roomFields,
      create: roomFields,
    });
  }
}
