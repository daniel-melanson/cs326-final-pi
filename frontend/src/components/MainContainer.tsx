import Enact from "../Enact";
import DropdownButtonRow from "./DropdownButtonRow";
import RoomList from "./RoomList";

export default function MainContainer() {
  return (
    <div className="container">
      <DropdownButtonRow onChange={(x) => console.log(x)} />
      <RoomList />
    </div>
  );
}
