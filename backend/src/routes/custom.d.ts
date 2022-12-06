import type Prisma from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    }
    interface Request {
      id: number;
      building: Prisma.Building;
      room: Prisma.Room;
      event: Prisma.Event;
      user: Prisma.User;
    }
  }
}
