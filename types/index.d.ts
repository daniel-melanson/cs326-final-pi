export interface Building {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  building_id: string;
  number: string;
  capacity: number;
  description: string;
}

export interface Event {
  id: string;
  room_id: string;
  title: string;
  start_time: string;
  end_time: string;
  owner_id: string;
}

export interface User {
  name: string;
  id: string;
}

export interface RESTfulRoom extends Room {
  url: string;
  building_url: string;
}

export interface RESTfulRoomField {
  url: string;
  number: string;
  id: string;
}

export interface RESTfulBuildingField {
  url: string;
  name: string;
}

export interface RESTfulBuilding extends Building {
  url: string;
  name: string;
  rooms: RESTfulRoomField[];
}

export interface RESTfulAvailability {
  start: string;
  end: string;
  room: RESTfulRoomField;
  building: RESTfulBuildingField;
}
