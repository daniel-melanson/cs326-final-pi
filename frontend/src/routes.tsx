import Enact from "Enact";
import Building from "./pages/Building";
import Buildings from "./pages/Buildings";
import Campus from "./pages/Campus";
import Home from "./pages/Home";
import Room from "./pages/Room";

interface Route {
  path: string;
  createPage: () => HTMLElement;
}

const ROUTES: Readonly<Route[]> = [
  {
    path: "/",
    createPage: () => <Home />,
  },
  {
    path: "/campus",
    createPage: () => <Campus />,
  },
  {
    path: "/buildings/",
    createPage: () => <Buildings />,
  },
  {
    path: "/buildings/:id",
    createPage: () => <Building />,
  },
  {
    path: "/rooms/:id",
    createPage: () => <Room />,
  },
];

export default ROUTES;
