import { Request } from "express";

export function urlBuilder(type: string, req: Request): (id: string) => string {
  const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);

  return (id: string) => new URL(`/api/${type}/${id}`, url.origin).toString();
}
