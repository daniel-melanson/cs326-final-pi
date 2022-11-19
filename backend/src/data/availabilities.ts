// import { Building } from "@prisma/client";
import { Building, Event, Room, User } from "#types";
import { config } from "dotenv";

import { PrismaClient } from "@prisma/client";

async function testPrisma() {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
            firstName: "U",
            lastName: "Mass",
            email: "umass@umass.edu",
            hash: "ertferfrg",
            salt: "dfgfbrbr",
    },
  });
}

async function testPrisma2() {
  const prisma = new PrismaClient();

  const user = await prisma.user.findMany();

  console.log(user);
}

config();
testPrisma2();
