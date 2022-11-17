import Building from "./pages/Building";
import Buildings from "./pages/Buildings";
import Campus from "./pages/Campus";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import SignUp from "./pages/SignUp";

interface Route {
  path: string;
  page: (props: any) => HTMLElement;
}

const ROUTES: Readonly<Route[]> = [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/campus",
    page: Campus,
  },
  {
    path: "/buildings",
    page: Buildings,
  },
  {
    path: "/buildings/:id",
    page: Building,
  },
  {
    path: "/rooms/:id",
    page: Room,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/signup",
    page: SignUp,
  },
];

export default ROUTES;
