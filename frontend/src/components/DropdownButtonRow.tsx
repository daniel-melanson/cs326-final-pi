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

  type FilterBuilder = (selected?: number, options?: DropdownOption[]) => HTMLElement;
  const BuildingDropdownBuilder: FilterBuilder = (selected, options) => (
    <DropdownButton
      key="Building"
      icon="building"
      options={options ?? []}
      selected={selected}
      onSelected={(i) => {
        updateList(0, BuildingDropdownBuilder, i, options);
      }}
    />
  );

  const RoomDropdownBuilder: FilterBuilder = (selected, options) => (
    <DropdownButton
      key="Room"
      icon="caret-down"
      options={options ?? []}
      selected={selected}
      onSelected={(i) => {
        updateList(1, RoomDropdownBuilder, i, options);
      }}
    />
  );

  const CapacityDropdownBuilder: FilterBuilder = (selected, options) => (
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
      selected={selected}
      onSelected={(i) => {
        updateList(2, CapacityDropdownBuilder, i, options);
      }}
    />
  );
  const DateDropdownBuilder: FilterBuilder = (selected, options) => (
    <DropdownButton
      key="Date"
      icon="calendar-date"
      options={dateOptions}
      selected={selected}
      onSelected={(i) => {
        updateList(3, DateDropdownBuilder, i, options);
      }}
    />
  );
  const DurationDropdownBuilder: FilterBuilder = (selected, options) => (
    <DropdownButton
      key="Duration"
      icon="clock"
      options={[
        ["30+ Minutes", "30"],
        ["1+ Hour", "60"],
        ["2+ Hours", "120"],
      ]}
      selected={selected}
      onSelected={(i) => {
        updateList(4, DurationDropdownBuilder, i, options);
      }}
    />
  );
  const SortByDropdownBuilder: FilterBuilder = (selected, options) => (
    <DropdownButton
      key="Sort By"
      icon="sort-down"
      options={[
        ["Duration", "duration"],
        ["Capacity", "capacity"],
        ["Availability", "availability"],
      ]}
      selected={selected}
      onSelected={(i) => {
        updateList(5, SortByDropdownBuilder, i, options);
      }}
    />
  );

  root.append(
    BuildingDropdownBuilder(),
    RoomDropdownBuilder(),
    CapacityDropdownBuilder(),
    DateDropdownBuilder(),
    DurationDropdownBuilder(),
    SortByDropdownBuilder()
  );

  (async () => {
    const res = await fetch("/api/buildings");
    const json: RESTfulBuilding[] = await res.json();
    const buildingOptions: DropdownOption[] = json.map((b) => [b.name, b.url]);

    updateList(0, BuildingDropdownBuilder, undefined, buildingOptions);
  })();

  async function updateList(position: number, builder: FilterBuilder, selected?: number, options?: DropdownOption[]) {
    const old = root.children.item(position)!;
    const replacement = builder(selected, options);
    root.replaceChild(replacement, old);

    if (position === 0 && selected !== undefined && options) {
      const res = await fetch(options[selected][1]);
      const json: RESTfulBuilding = await res.json();
      const roomOptions: DropdownOption[] = json.rooms.map((r) => [r.number, r.url]);
      roomOptions.sort((a, b) => Number(a[0]) - Number(b[0]));

      updateList(1, RoomDropdownBuilder, undefined, roomOptions);
    }
  }

  return root;
}
