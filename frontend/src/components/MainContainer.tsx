import Enact from "../Enact";
import DropdownButtonRow, { AvailabilityConditions } from "./DropdownButtonRow";
import RoomList from "./RoomList";

export default function MainContainer() {
  const root = <div className="container" />;

  async function updateRoomList(x: AvailabilityConditions) {
    console.log(x);
    if (!x.date) {
      root.replaceChild(<RoomList />, root.lastChild!);
      return;
    }

    const url = new URL("/api/availabilities", document.baseURI);
    for (const [key, value] of Object.entries(x)) {
      if (value !== undefined) url.searchParams.append(key, value);
    }

    const res = await fetch(url.toString());
    const json: APIAvailability[] = await res.json();
    root.replaceChild(<RoomList listings={json} />, root.lastChild!);
  }

  root.append(<DropdownButtonRow onChange={updateRoomList} />, <RoomList />);

  return root;
}
