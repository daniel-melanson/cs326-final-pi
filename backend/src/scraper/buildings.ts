/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

// Fetches normalized building information, output in NORMALIZED_BUILDINGS.js
export async function fetchNormalizedBuildings(): Promise<any> {
  let pageURL = 'https://spire-api.melanson.dev/buildings/';
  const buildings: any = {};
  do {
    const res = await fetch(pageURL);
    const json: any = await res.json();

    for (const building of json.results) {
      buildings[building.name] = building;
    }

    pageURL = json.next;

    await sleep(1000);
  } while (pageURL);

  return buildings;
}
