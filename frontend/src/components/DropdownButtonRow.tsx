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

  const root = <div className="d-flex justify-content-center" />;

  const children = [
    <DropdownButton key="Building" icon="building" options={[]} />,
    <DropdownButton key="Room" icon="caret-down" options={[]} />,
    <DropdownButton
      key="Capacity"
      icon="caret-down"
      options={[
        ["10+", "10"],
        ["25+", "25"],
        ["50+", "50"],
        ["100+", "100"],
        ["200+", "200"],
      ]}
    />,
    <DropdownButton key="Date" icon="calendar-date" options={dateOptions} />,
    <DropdownButton
      key="Duration"
      icon="clock"
      options={[
        ["30+ Minutes", "30"],
        ["1+ Hour", "60"],
        ["2+ Hours", "120"],
      ]}
    />,
    <DropdownButton
      key="Sort By"
      icon="sort-down"
      options={[
        ["Duration", "duration"],
        ["Capacity", "capacity"],
        ["Availability", "availability"],
      ]}
    />,
  ];
  root.append(...children);

  (async () => {
    const res = await fetch("/api/buildings");
    const json: RESTfulBuilding[] = await res.json();
    const buildingOptions: DropdownOption[] = json.map((b) => [b.name, b.url]);
    console.log(root.children[0]);

    root.replaceChild(<DropdownButton key="Building" icon="building" options={buildingOptions} />, root.children[0]);
  })();

  return root;
}
