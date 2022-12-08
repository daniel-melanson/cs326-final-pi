// /api/buildings -> APIBuilding[]
// /api/rooms/:id -> APIRoom
// /api/rooms/:id/events -> APIEvent[]
// /api/events/:id -> APIEvent

interface APIBuilding {
  id: number;
  url: string;
  name: string;
  address: string;
  rooms: APIRoomField[];
}

interface APIRoomField {
  id: number;
  url: string;
  liveId: number;
  number: string;
  capacity: number;
  features: string;
}

interface APIRoom {
  id: number;
  url: string;
  building: APIBuildingField;
  number: string;
  liveId: number;
  capacity: number;
  features: string;
}

interface APIBuildingField {
  id: number;
  url: string;
  name: string;
  address: string;
}

interface APIEventField {
  id: number;
  liveId: number;
  url: string;
  title: string;
  startTime: string;
  endTime: string;
  organization: string;
  creationDate: string;
}

interface APIRoomAvailability {
  room: APIRoomField;
  availabilities: { startDate: string; endDate: string }[];
}

interface APIAvailability {
  building: APIBuildingField;
  roomAvailabilities: APIRoomAvailability[];
}

interface APIProfileEvents {
  id: number;
  liveId: number;
  url: string;
  title: string;
  startTime: string;
  endTime: string;
  organization: string;
  creationDate: string;
  room: APIRoom;
  descritpion: string;
}
