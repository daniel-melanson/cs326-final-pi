import Navbar from "components/Navbar";
import RoomListings from "components/RoomListings";
import Enact from "./Enact";

function Root() {
  return (
    <div>
      <Navbar />
      <RoomListings />
    </div>
  );
}

document.body.appendChild(<Root />);