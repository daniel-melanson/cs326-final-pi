import type { Request, RequestHandler } from 'express';
import { URL } from 'node:url';
import type { TableNames } from '../db/index.js';
import { SERIALIZERS } from '../db/serializers.js';

export function objectGETHandler(table: TableNames): RequestHandler {
  const serializer = SERIALIZERS[table];
  return (req, res) => {
    const obj = req[table];

    res.status(200).json(serializer(req, obj));
  };
}

export function urlBuilder(type: string, req: Request): (id: string) => string {
  const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);

  return (id: string) => new URL(`/api/${type}/${id}`, url.origin).toString();
}
