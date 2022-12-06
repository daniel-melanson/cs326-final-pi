import Enact from "../Enact";
import DropdownButton, { DropdownOption } from "./DropdownButton";

export interface AvailabilityConditions {
  building?: string;
  room?: string;
  capacity?: string;
  date?: string;
  duration?: string;
}

interface DropdownButtonRowProps {
  onChange: (conditions: AvailabilityConditions) => void;
}

interface EntryState {
  element?: HTMLElement;
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
}

export default function DropdownButtonRow(props: DropdownButtonRowProps) {
  const root = <div className="d-flex justify-content-center" />;

  const state: RowState = {
    building: {
      options: [],
      disabled: true,
    },
    room: {
      options: [],
      disabled: true,
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
      options: [
        ["1+ Hour", "60"],
        ["2+ Hours", "120"],
        ["3+ Hours", "180"],
      ],
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
      onSelected={i => onSelect("building", i)}
    />
  );

  const RoomDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Room"
      icon="r-square"
      options={state.room.options}
      selected={state.room.selected}
      disabled={state.room.disabled}
      onSelected={i => onSelect("room", i)}
    />
  );

  const CapacityDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Capacity"
      icon="box2"
      options={state.capacity.options}
      selected={state.capacity.selected}
      disabled={state.capacity.disabled}
      onSelected={i => onSelect("capacity", i)}
    />
  );

  const DateDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Date"
      icon="calendar-date"
      options={state.date.options}
      selected={state.date.selected}
      disabled={state.date.disabled}
      onSelected={i => onSelect("date", i)}
    />
  );

  const DurationDropdownBuilder: FilterBuilder = () => (
    <DropdownButton
      key="Duration"
      icon="clock"
      options={state.duration.options}
      selected={state.duration.selected}
      disabled={state.duration.disabled}
      onSelected={i => onSelect("duration", i)}
    />
  );

  const BUILDERS = {
    building: BuildingDropdownBuilder,
    room: RoomDropdownBuilder,
    capacity: CapacityDropdownBuilder,
    date: DateDropdownBuilder,
    duration: DurationDropdownBuilder,
  };

  function onSelect(dropdown: keyof RowState, selectedIndex?: number) {
    const currentState = state[dropdown];
    currentState.selected = selectedIndex;

    refreshRow(dropdown);

    if (dropdown === "building") {
      if (state.building.selected !== undefined) {
        const url = `/api/buildings/${state.building.options[state.building.selected][1]}`;
        (async () => {
          const res = await fetch(url);
          const json: APIBuilding = await res.json();
          const roomOptions: DropdownOption[] = json.rooms.map(r => [r.number, String(r.id)]);
          roomOptions.sort((a, b) => Number(a[0]) - Number(b[0]));

          state.room.options = roomOptions;
          state.room.disabled = false;
          refreshRow("room");
        })();
      } else {
        state.room.options = [];
        state.room.disabled = true;
        refreshRow("room");
      }
    } else if (dropdown === "room" && state.room.selected !== undefined) {
      state.capacity.selected = undefined;
      refreshRow("capacity");
    } else if (dropdown === "capacity" && state.capacity.selected !== undefined) {
      state.room.selected = undefined;
      refreshRow("room");
    }

    props.onChange(
      Object.entries(state).reduce((acc, [k, v]) => {
        const value = v.selected !== undefined ? v.options[v.selected][1] : undefined;

        return { ...acc, [k]: value };
      }, {})
    );
  }

  function refreshRow(dropdown: keyof RowState) {
    const elem = BUILDERS[dropdown]();
    const current = state[dropdown].element;
    if (current) root.replaceChild(elem, current);
    else root.appendChild(elem);

    state[dropdown].element = elem;
  }

  (Object.keys(state) as (keyof RowState)[]).forEach(refreshRow);

  (async () => {
    const res = await fetch("/api/buildings");
    const json: APIBuilding[] = await res.json();
    state.building.options = json.map(b => [b.name, String(b.id)]);
    state.building.disabled = false;

    refreshRow("building");
  })();

  return root;
}
