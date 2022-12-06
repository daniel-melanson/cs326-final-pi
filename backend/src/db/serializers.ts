import type { Building, Event, Room } from '@prisma/client';
import type { Request } from 'express';
import type { TableNames } from './index.js';

const makeURL = (req: Request, type: string, id: number) => {
  return `${req.protocol}://${req.get('host')}/api/${type}/${id}`;
};

type R<T> = {
  [key in string | keyof T]: any;
};

type Serializer<T> = (req: Request, x: T) => R<T>;

export const serializeRoomField = (req: Request, r: Room) => {
  return {
    id: r.id,
    url: makeURL(req, 'rooms', r.id),
    number: r.number,
  };
};

export const serializeBuilding = (req: Request, b: Building & { rooms: Room[] }) => {
  return {
    id: b.id,
    url: makeURL(req, 'buildings', b.id),
    name: b.name,
    address: b.address,
    rooms: b.rooms.map((r) => serializeRoomField(req, r)),
  };
};

export const serializeBuildingField = (req: Request, b: Building) => {
  return {
    id: b.id,
    url: makeURL(req, 'buildings', b.id),
    name: b.name,
    address: b.address,
  };
};

export const serializeRoom = (req: Request, r: Room & { building: Building }) => {
  return {
    id: r.id,
    url: makeURL(req, 'rooms', r.id),
    building: serializeBuildingField(req, r.building),
    number: r.number,
    liveId: r.liveId,
    capacity: r.capacity,
    features: r.features,
  };
};

export const serializeRoomNoBuilding = (req: Request, r: Room) => {
  return {
    id: r.id,
    url: makeURL(req, 'rooms', r.id),
    number: r.number,
    liveId: r.liveId,
    capacity: r.capacity,
    features: r.features,
  };
};

export const serializeEvent = (req: Request, e: Event & { room: Room }) => {
  return {
    id: e.id,
    liveId: e.liveId,
    url: makeURL(req, 'events', e.id),
    room: serializeRoomField(req, e.room),
    title: e.title,
    startTime: e.startTime,
    endTime: e.endTime,
    organization: e.organization,
    creationDate: e.creationDate,
  };
};

export const serializeEventField = (req: Request, e: Event & { room: Room }) => {
  return {
    id: e.id,
    liveId: e.liveId,
    url: makeURL(req, 'events', e.id),
    title: e.title,
    startTime: e.startTime,
    endTime: e.endTime,
    organization: e.organization,
    creationDate: e.creationDate,
  };
};

export const SERIALIZERS: Record<TableNames, Serializer<any>> = {
  building: serializeBuilding,
  room: serializeRoom,
  event: serializeEvent,
  user: serializeBuilding,
};
