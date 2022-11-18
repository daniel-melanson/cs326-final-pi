export interface Building {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  building_id: string;
  title: string;
  number: string;
  capacity: number;
  description: string;
  address: string;
  layout: string;
  category: string;
}

export interface Event {
  id: string;  // eventID
  room_id: string; // roomName
  title: string; // Event Title
  start_time: string; 
  reference_id: string;
  organization: string;
  type: string;
  categories: string;
  creation_date: string;
  state:string;
  end_time: string;
  owner_id: number;
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
