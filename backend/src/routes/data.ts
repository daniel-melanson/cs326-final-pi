import { faker } from "@faker-js/faker";

interface Building {}

interface Room {}

interface Event {}

interface User {}

export const rooms = [];

export const buildings = [];

for (let i = 0; i < 100; i++) {
  const building = faker.datatype.uuid();
}

export const events = [
  {
    start_time: "",
    end_time: "",
    title: "",
    room_id: "",
  },
];
