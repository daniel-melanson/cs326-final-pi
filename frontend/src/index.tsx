import { Dropdown } from "bootstrap";
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

const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
const dropdownList = Array.from(dropdownElementList).map((dropdownToggleEl) => new Dropdown(dropdownToggleEl));
console.dir(dropdownList);
