import Enact from "../Enact";
import DropdownButton, { DropdownOption } from "./DropdownButton";

export interface AvailabilityConditions {
  building_id?: string;
  room_id?: string;
  capacity?: string;
  date_iso?: string;
  duration?: string;
  sort_by?: string;
}

interface DropdownButtonRowProps {
  onChange: (conditions: AvailabilityConditions) => void;
}

interface EntryState {
  options: DropdownOption[];
  selected?: number;
  disabled?: boolean;
}

interface RowState {
  building: EntryState;
  room: EntryState;
  capacity: EntryState;
  date: EntryState;
  duration: EntryState;
  sortBy: EntryState;
}

export default function DropdownButtonRow(props: DropdownButtonRowProps) {
  const root = <div className="d-flex justify-content-center" />;

  const state: RowState = {
    building: {
      options: [],
    },
    room: {
      options: [],
    },
    capacity: {
      options: [
        ["10+ Seats", "10"],
        ["25+ Seats", "25"],
        ["50+ Seats", "50"],
        ["100+ Seats", "100"],
        ["200+ Seats", "200"],
      ],
    },
    date: {
      options: [],
    },
    duration: {
      options: [],
    },
    sortBy: {
      options: [],
    },
  };

  let today = new Date();
  for (let i = 0; i < 7; i++) {
    state.date.options.push([today.toLocaleDateString(), today.toISOString()]);

    today = new Date(today.setDate(today.getDate() + 1));
  }

  type FilterBuilder = () => HTMLElement;
  const BuildingDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Building"
      icon="building"
      options={state.building.options}
      selected={state.building.selected}
      disabled={state.building.disabled}
      onSelected={i => onSelect(0, i)}
    />
  );

  const RoomDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Room"
      icon="r-square"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect(1, i)}
    />
  );

  const CapacityDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Capacity"
      icon="box2"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect(2, i)}
    />
  );

  const DateDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Date"
      icon="calendar-date"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect(3, i)}
    />
  );

  const DurationDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Duration"
      icon="clock"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect(4, i)}
    />
  );

  const SortByDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Sort By"
      icon="sort-down"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect(5, i)}
    />
  );

  const BUILDERS = [
    BuildingDropdownBuilder,
    RoomDropdownBuilder,
    CapacityDropdownBuilder,
    DateDropdownBuilder,
    DurationDropdownBuilder,
    SortByDropdownBuilder,
  ];

  root.append(BUILDERS.map(b => b()));

  function onSelect(dropdownIndex: number, selectedIndex?: number) {
    const builder = BUILDERS[dropdownIndex];
  }

  function refreshRow() {

  }

  // (async () => {
  //   const res = await fetch("/api/buildings");
  //   const json: APIBuilding[] = await res.json();
  //   const buildingOptions: DropdownOption[] = json.map(b => [b.name, b.id]);

  //   updateList(0, BuildingDropdownBuilder, undefined, buildingOptions);
  // })();

  // const conditions: AvailabilityConditions = {};
  // async function updateList(position: number, builder: FilterBuilder, selected?: number, options?: DropdownOption[]) {
  //   const old = root.children.item(position)!;
  //   const replacement = builder(selected, options);
  //   root.replaceChild(replacement, old);

  //   if (selected !== undefined && options) {
  //     const conditionKeys: (keyof AvailabilityConditions)[] = [
  //       "building_id",
  //       "room_id",
  //       "capacity",
  //       "date_iso",
  //       "duration",
  //       "sort_by",
  //     ];

  //     const conditionKey = conditionKeys[position];

  //     conditions[conditionKey] = options[selected][1];
  //     props.onChange(conditions);
  //   }

  //   if (position === 0 && options) {
  //     if (selected === undefined) {
  //       updateList(1, RoomDropdownBuilder, undefined, []);
  //     } else {
  //       const res = await fetch(`/api/buildings/${options[selected][1]}`);
  //       const json: APIBuilding = await res.json();
  //       const roomOptions: DropdownOption[] = json.rooms.map(r => [r.number, r.id]);
  //       roomOptions.sort((a, b) => Number(a[0]) - Number(b[0]));

  //       updateList(1, RoomDropdownBuilder, undefined, roomOptions);
  //     }
  //   } else if (position === 1) {
  //     updateList(2, CapacityDropdownBuilder, undefined, selected ? [] : capacityOptions);
  //   }
  // }

  return root;
}
