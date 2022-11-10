import { RESTfulAvailability } from "#types";
import Enact from "../Enact";
import Room, { RoomAvailabilities } from "./Room";

export interface RoomListProps {
  listings?: RESTfulAvailability;
}

export default function RoomList(props: RoomListProps) {
  const listings = props.listings;

  if (!listings) {
    return <div>Please select a date.</div>;
  }

  const roomAvailabilityMap = listings.availabilities.reduce((acc, listing) => {
    const arr = acc.get(listing.room_id) ?? [];
    if (arr.length === 0) {
      acc.set(listing.room_id, arr);
    }

    arr.push({
      start_date: new Date(listing.start),
      end_date: new Date(listing.end),
    });

    return acc;
  }, new Map<string, RoomAvailabilities[]>());

  const root = <div />;
  const entries = new Array(...roomAvailabilityMap.entries());

  root.append(
    ...entries.map(([room_id, availabilityListings]) => {
      const room = listings.rooms[room_id];

      return (
        <Room
          availabilities={availabilityListings}
          address={room.address}
          building={room.building.name}
          capacity={room.capacity}
          number={room.number}
          description={room.description}
          roomId={room.id}
        />
      );
    })
  );

  return root;
}
