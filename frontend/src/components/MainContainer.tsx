import Enact from "../Enact";
import Building from "./Building";
import DropdownButtonRow, { AvailabilityConditions } from "./DropdownButtonRow";

export default function MainContainer() {
  const root = <div className="container" />;

  async function updateRoomList(x: AvailabilityConditions) {
    if (!x.date) {
      root.replaceChild(<div class="text-center">No results found.</div>, root.lastChild!);
      return;
    }

    const url = new URL("/api/availabilities", document.baseURI);
    for (const [key, value] of Object.entries(x)) {
      if (value !== undefined) url.searchParams.append(key, value);
    }

    const res = await fetch(url.toString());
    const json: APIAvailability[] = await res.json();

    root.replaceChild(
      <div class="container">
        {json.length > 0 ? (
          json.map(avail => <Building details={avail} />)
        ) : (
          <div class="text-center">No results found.</div>
        )}
      </div>,
      root.lastChild!
    );
  }

  root.append(<DropdownButtonRow onChange={updateRoomList} />, <div class="text-center">No results found.</div>);

  return root;
}
