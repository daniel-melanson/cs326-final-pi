export interface Building {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  building_id: string;
  number: string;
  capacity: number;
}

export interface Event {
  id: string;
  room_id: string;
  title: string;
  start_time: string;
  end_time: string;
}
