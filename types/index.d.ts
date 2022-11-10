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
  address: string;
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

export interface RESTfulUserField {
  id: string;
  name: string;
}

export interface RESTfulEvent {
  id: string;
  room: RESTfulRoomField;
  title: string;
  start_time: string;
  end_time: string;
  owner: RESTfulUserField;
}

export interface RESTfulRoom {
  id: string;
  url: string;
  building: RESTfulBuildingField;
  number: string;
  capacity: string;
  description: string;
  address: string;
}

export interface RESTfulRoomField {
  url: string;
  number: string;
  id: string;
}

export interface RESTfulBuildingField {
  url: string;
  name: string;
  id: string;
}

export interface RESTfulBuilding extends Building {
  url: string;
  name: string;
  rooms: RESTfulRoomField[];
}

export interface RESTfulAvailabilityField {
  start: string;
  end: string;
  room_id: string;
}

export interface RESTfulAvailability {
  rooms: {
    [key: string]: RESTfulRoom;
  };
  availabilities: RESTfulAvailabilityField[];
}
