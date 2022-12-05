import type { Building, Prisma, Room } from '@prisma/client';
import { Router } from 'express';
import { query } from 'express-validator';
import assert from 'node:assert';
import prisma from '../db/index.js';
import { serializeRoom } from '../db/serializers.js';
import validate from '../middleware/validate.js';

export const availabilities = Router();

export function roundDate(d: Date, direction: 'down' | 'up') {
  d = new Date(d);

  const m = d.getMinutes();
  const roundedM = Math[direction === 'up' ? 'ceil' : 'floor'](m / 10) * 10;
  return new Date(d.setMinutes(roundedM));
}

export function segmentDate(start: Date, end: Date): string[] {
  start = new Date(start.setSeconds(0, 0));
  end = new Date(end.setSeconds(0, 0));

  assert(start.getTime() < end.getTime());

  const segments = [];
  let current = roundDate(start, 'down');
  const endDate = roundDate(end, 'up');
  while (current.getTime() < endDate.getTime()) {
    segments.push(current.toISOString());

    current = new Date(current.setMinutes(current.getMinutes() + 5));
  }

  return segments;
}

availabilities.get(
  '/',
  validate([
    query('building').optional().isInt({ gt: -1 }),
    query('room').optional().isInt({ gt: -1 }),
    query('capacity').optional().isIn(['10', '25', '50', '100', '200']),
    query('date').optional(false).isISO8601(),
    query('duration').optional().isIn([, '60', '120', '180']),
  ]),
  async (req, res) => {
    const { building, room, capacity, date, duration } = req.query as Record<string, string>;
    const startDate = new Date(date!);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59);

    const filters: Prisma.EventWhereInput = {
      room: {},
      startTime: {
        gte: startDate,
      },
      endTime: {
        lte: endDate,
      },
    };

    if (room) {
      filters.room!.id = Number(room);
    } else if (building) {
      filters.room!.buildingId = Number(building);
    }

    if (capacity) {
      filters.room!.capacity = {
        gt: Number(capacity),
      };
    }

    const minDuration = duration ? Number(duration) : 60;

    const events = await prisma.event.findMany({
      where: filters,
      include: {
        room: {
          include: {
            building: true,
          },
        },
      },
    });

    const availabilityStart = new Date(startDate);
    availabilityStart.setHours(7, 0, 0, 0);
    const availabilityEnd = new Date(availabilityStart);
    availabilityEnd.setHours(19, 0, 0, 0);

    const availabilityTimes = segmentDate(availabilityStart, availabilityEnd);
    const completeAvailableTime = availabilityTimes.reduce((acc, x) => ({ ...acc, [x]: 5 }), {});

    const roomAvailabilities = new Map<number, Record<string, number>>();
    const rooms = new Map<number, Room & { building: Building }>();

    for (const event of events) {
      let roomAvailability;
      if (roomAvailabilities.has(event.roomId)) {
        roomAvailability = roomAvailabilities.get(event.roomId)!;
      } else {
        roomAvailability = { ...completeAvailableTime };
        roomAvailabilities.set(event.roomId, roomAvailability);
        rooms.set(event.roomId, event.room);
      }

      const times = segmentDate(new Date(event.startTime), new Date(event.endTime));
      for (const t of times) {
        delete roomAvailability[t];
      }
    }

    const totalAvailabilities = [];
    for (const [roomId, roomAvailability] of roomAvailabilities.entries()) {
      const room = rooms.get(roomId)!;

      const availabilityResults = availabilityTimes
        .reduce((acc, t, i) => {
          if (!(t in roomAvailability)) return acc;

          const newAvailability = {
            startTime: t,
            duration: roomAvailability[t]!,
            timeIndex: i,
          };

          const lastIndex = acc.length - 1;
          if (lastIndex < 0 || !acc[lastIndex]) return [newAvailability];

          const lastEntry = acc[lastIndex]!;
          if (i - lastEntry.timeIndex > 1) {
            acc.push(newAvailability);
          } else {
            lastEntry.duration += newAvailability.duration;
            lastEntry.timeIndex = i;
          }

          return acc;
        }, [] as { startTime: string; duration: number; timeIndex: number }[])
        .filter((x) => x.duration >= minDuration)
        .map((x) => {
          const startDate = new Date(x.startTime);
          const endDate = new Date(startDate.setMinutes(startDate.getMinutes() + x.duration));

          return {
            startDate: x.startTime,
            endDate: endDate.toISOString(),
            duration: duration,
          };
        });

      if (availabilityResults.length > 0) {
        totalAvailabilities.push({
          room: serializeRoom(req, room),
          availabilities: availabilityResults,
        });
      }
    }

    res.status(200).json(totalAvailabilities).end();
  },
);
