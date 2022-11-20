import { config } from 'dotenv';

config();

export const PORT = process.env['PORT'] ?? 8000;

export const SECRET = process.env['SECRET'] ?? 'shhh';
