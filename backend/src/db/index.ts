import { Building, Event, PrismaClient, Room, User } from '@prisma/client';
import { config } from 'dotenv';

config();

export type TableNames = 'building' | 'room' | 'event' | 'user';
export type TableObject = Building | Room | Event | User;

export default new PrismaClient();
