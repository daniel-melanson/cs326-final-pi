/* eslint-disable @typescript-eslint/no-explicit-any */

import assert from 'node:assert';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fetchNormalizedBuildings } from './buildings.js';
import { fetchJSON } from './fetchJSON.js';

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

  const entries = rows.map((row: any) => {
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

  return entries;
}

function readJSON(path: string) {
  return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
}

function writeJSON(path: string, content: object) {
  fs.writeFileSync(path, JSON.stringify(content));
}

interface NormalizedRoom {

}

export async function syncRooms() {
  const normalizedBuildingsJSONPath = path.join('.', 'json', 'NORMALIZED_BUILDINGS.json');
  const rawRoomsJSONPath = path.join('.', 'json', 'RAW_ROOMS.json');
  const normalizedRoomsJSONPath = path.join('.', 'NORMALIZED_ROOMS.json');

  if (!fs.statSync(normalizedBuildingsJSONPath, { throwIfNoEntry: false })) {
    writeJSON(normalizedBuildingsJSONPath, await fetchNormalizedBuildings());
  }

  const rawRooms = await fetchRawRooms();
  rawRooms.sort((a, b) => a.name.localeCompare(b.name));
  writeJSON(
    rawRoomsJSONPath,
    rawRooms.filter((r) => r.name.length > 0),
  );

  const result = execSync('python3 ./src/scraper/normalize_rooms.py'); // lol
  console.log(result.toString())


  const normalizedRooms: NormalizedRoom[] = readJSON(normalizedRoomsJSONPath);
}
