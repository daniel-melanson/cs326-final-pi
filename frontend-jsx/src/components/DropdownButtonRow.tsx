import Enact from "../Enact";
import DropdownButton from "./DropdownButton";

export default function DropdownButtonRow() {
  return (
    <div className="row my-3 justify-content-center">
      <DropdownButton
        name="Building"
        icon="building"
        options={[
          "Integrative Learning Center",
          "Integrated Science Building",
          "Bartlett",
        ]}
      />
      <DropdownButton name="Room" icon="caret-down" options={[]} />
      <DropdownButton
        name="Capacity"
        icon="caret-down"
        options={["10+", "25+", "50+", "100+", "200+"]}
      />
      <DropdownButton name="Date" icon="calendar-date" options={[]} />
      <DropdownButton
        name="Duration"
        icon="clock"
        options={["30+ Minutes", "1+ Hour", "2+ Hours"]}
      />
      <DropdownButton name="Sort By" icon="sort-down" options={[]} />
    </div>
  );
}
