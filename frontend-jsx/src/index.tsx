import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";
import Enact from "./Enact";


function Root() {
  return (
    <div>
      <Navbar />
      <MainContainer />
    </div>
  );
}

document.body.appendChild(<Root />);
