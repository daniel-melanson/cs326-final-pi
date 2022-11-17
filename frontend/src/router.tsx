import Enact from "./Enact";
import NotFound from "./pages/NotFound";
import ROUTES from "./routes";

interface NavigationOptions {
  path: string[];
  search?: URLSearchParams;
}

interface Route {
  segments: Readonly<string[]>;
  page: (props: any) => HTMLElement;
}

export function segmentPath(path: string) {
  return path
    .split("/")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.replace(/^[\/]*|[\/-]*$/g, ""));
}

class Router {
  private readonly routes: Route[];

  constructor() {
    this.routes = ROUTES.map(r => ({
      segments: segmentPath(r.path),
      page: r.page,
    }));

    console.dir(`Loaded routes:`, this.routes);
  }

  navigateTo(options: NavigationOptions) {
    const { path, search } = options;

    const route = this.routes.find(
      r => r.segments.length === path.length && r.segments.every((x, i) => x === path[i] || x.startsWith(":"))
    );

    if (!route) return this._renderPage(NotFound);

    const params: Record<string, string> = {};

    for (const i in route.segments) {
      const segment = route.segments[i];
      const given = path[i];

      if (segment.startsWith(":")) {
        params[segment.substring(1)] = given;
      }
    }

    this._renderPage(route.page, params, search);
  }

  private _renderPage(Page: (props: any) => HTMLElement, params?: Record<string, string>, search?: URLSearchParams) {
    document.body.innerHTML = "";
    document.body.appendChild(<Page parameters={params} search={search} />);
  }
}

export default new Router();
