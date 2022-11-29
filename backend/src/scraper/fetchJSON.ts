/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert';
import fetch from 'node-fetch';

export async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url);
  assert(res.ok, `Expected response to be OK, got: ${res.statusText}`);
  const text = await res.text();
  return JSON.parse(text.substring(5));
}
