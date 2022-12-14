import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import prisma from '../db/index.js';
async function testPrisma() {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      firstName: 'U',
      lastName: 'Mass',
      email: 'umass@umass.edu',
      hash: 'ertferfrg',
    },
  });
}

async function testPrisma2() {
  const prisma = new PrismaClient();

  const user = await prisma.event.deleteMany({where: {ownerId : 5}});

  console.log(user);
}

async function checkRooms() {
  //const rooms = await prisma.event.Many()
  //console.log(rooms)
}
async function addBuildings() {
  const buildings = JSON.parse(fs.readFileSync('building.json').toString());

  console.log(buildings);

  for (const building of buildings) {
    const address_beg = 'https://maps.google.com/maps?q=UMass%20Amherst%20';
    const building_param = building.replace(' ', '%20');
    const address_end = '&t=&z=16&ie=UTF8&iwloc=&output=embed';

    const address = address_beg.concat(building_param, address_end);

    const user = await prisma.building.create({
      data: {
        id: building,
        address: address,
        name: building,
      },
    });
  }
}
//addBuildings();

//checkRooms()

testPrisma2();
