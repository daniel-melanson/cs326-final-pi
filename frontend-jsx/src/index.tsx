import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";
import Enact from "./Enact";
import ReservationModal from "./components/ReservationModal";


function Root() {
  return (
    <div>
      <ReservationModal start_date="11:00AM" end_date="12:00PM" building="ILC" room = "ILC151" />

      
    </div>
  );
}

document.body.appendChild(<Root />);
