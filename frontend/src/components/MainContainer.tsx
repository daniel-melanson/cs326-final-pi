import { RESTfulAvailability } from "#types";
import Enact from "../Enact";
import DropdownButtonRow, { AvailabilityConditions } from "./DropdownButtonRow";
import RoomList from "./RoomList";

export default function MainContainer() {
  const root = <div className="container" />;

  async function updateRoomList(x: AvailabilityConditions) {
    if (!x.date_iso) {
      root.replaceChild(<RoomList />, root.lastChild!);
      return;
    }

    const url = new URL(`${document.URL}api/availabilities`);

    for (const [key, value] of Object.entries(x)) {
      url.searchParams.append(key, value);
    }

    const res = await fetch(url.toString());
    const json: RESTfulAvailability = await res.json();

    root.replaceChild(<RoomList listings={json} />, root.lastChild!);
  }

  root.append(<DropdownButtonRow onChange={updateRoomList} />, <RoomList />);

  return root;
}
