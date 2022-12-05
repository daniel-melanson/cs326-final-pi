import Enact from "../Enact";
import Room from "./Room";

export interface RoomListProps {
  listings?: APIAvailability[];
}

export default function RoomList(props: RoomListProps) {
  const listings = props.listings;

  if (!listings) {
    return <div class="text-center">Select a date to view listings.</div>;
  }

  const root = <div />;

  root.append(
    ...listings.map(listing => {
      return (
        <Room
          availabilities={listing.availabilities.map(a => ({
            startDate: new Date(a.startDate),
            endDate: new Date(a.endDate),
          }))}
          address={listing.room.building.address}
          building={listing.room.building.name}
          capacity={listing.room.capacity < 5 ? "Unknown" : listing.room.capacity}
          number={listing.room.number}
          description={listing.room.features || "No known features."}
          roomId={listing.room.id}
        />
      );
    })
  );

  return root;
}
