import Enact from "../Enact";
import DropdownButton from "./DropdownButton";

export default function DropdownButtonRow() {
  return (
    <div>
      <DropdownButton
        name="Building"
        options={[
          "Integrative Learning Center",
          "Integrated Science Building",
          "Bartlett",
        ]}
      />
      <DropdownButton name="Room" options={[]} />
      <DropdownButton
        name="Capacity"
        options={["10+", "25+", "50+", "100+", "200+"]}
      />
      <DropdownButton name="Date" options={[]} />
      <DropdownButton
        name="Duration"
        options={["30+ Minutes", "1+ Hour", "2+ Hours"]}
      />
      <DropdownButton name="Sort By" options={[]} />
    </div>
  );
}
