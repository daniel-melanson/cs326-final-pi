import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();

export default new PrismaClient();
