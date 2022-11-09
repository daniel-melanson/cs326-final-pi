import { RESTfulBuilding } from "#types";
import Enact from "../Enact";
import DropdownButton, { DropdownOption } from "./DropdownButton";

export default function DropdownButtonRow() {
  const dateOptions: DropdownOption[] = [];

  let today = new Date();
  for (let i = 0; i < 7; i++) {
    dateOptions.push([today.toLocaleDateString(), today.toISOString()]);

    today = new Date(today.setDate(today.getDate() + 1));
  }

  const [buildingList, setBuildingList] = Enact.useState<DropdownOption[]>([]);
  const [roomList, setRoomList] = Enact.useState<DropdownOption[]>([]);

  Enact.useEffect(async () => {
    const res = await fetch("/api/buildings");
    const json: RESTfulBuilding[] = await res.json();

    setBuildingList(json.map((b) => [b.name, b.url]));
  }, []);

  const [building, setBuilding] = Enact.useState<DropdownOption | undefined>(undefined);
  const [room, setRoom] = Enact.useState<DropdownOption[]>([]);

  Enact.useEffect(async () => {
    if (!building) return;

    const res = await fetch(building[1]);
    const json: RESTfulBuilding = await res.json();

    setRoomList(json.rooms.map((r) => [r.number, r.url]));
  }, [building]);

  return (
    <div className="d-flex justify-content-center">
      <DropdownButton name="Building" icon="building" options={buildingList} />
      <DropdownButton name="Room" icon="caret-down" options={roomList} />
      <DropdownButton
        name="Capacity"
        icon="caret-down"
        options={[
          ["10+", "10"],
          ["25+", "25"],
          ["50+", "50"],
          ["100+", "100"],
          ["200+", "200"],
        ]}
      />
      <DropdownButton name="Date" icon="calendar-date" options={dateOptions} />
      <DropdownButton
        name="Duration"
        icon="clock"
        options={[
          ["30+ Minutes", "30"],
          ["1+ Hour", "60"],
          ["2+ Hours", "120"],
        ]}
      />
      <DropdownButton
        name="Sort By"
        icon="sort-down"
        options={[
          ["Duration", "duration"],
          ["Capacity", "capacity"],
          ["Availability", "availability"],
        ]}
      />
    </div>
  );
}
