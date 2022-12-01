import fs from 'node:fs';
import path from 'node:path';

export function partition<T>(arr: T[], f: (x: T) => unknown): [T[], T[]] {
  const passed: T[] = [],
    failed: T[] = [];

  for (const x of arr) {
    const a = f(x) ? passed : failed;

    a.push(x);
  }

  return [passed, failed];
}

export function readJSON(name: string) {
  const p = path.join('.', 'json', name + '.json');
  return JSON.parse(fs.readFileSync(p, { encoding: 'utf-8' }));
}

export function writeJSON(name: string, content: object) {
  const p = path.join('.', 'json', name + '.json');
  fs.writeFileSync(p, JSON.stringify(content, undefined, 4));
}

export function exists(path: string): boolean {
  return Boolean(fs.statSync(path, { throwIfNoEntry: false }));
}
