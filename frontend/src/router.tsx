import Navigo from "navigo";
import Room from "./components/Room";
import Enact from "./Enact";
import Building from "./pages/Building";
import Buildings from "./pages/Buildings";
import Campus from "./pages/Campus";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = new Navigo("/");

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

for (const route of ROUTES) {
  router.on(route.path, match => {
    document.body.innerHTML = "";
    document.body.appendChild(<route.page parameters={match?.data} search={match?.queryString} />);
  });
}

router.resolve();

export default router;