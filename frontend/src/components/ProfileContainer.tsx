import Enact from "../Enact";

export default function ProfileContainer() {
  const root = <div className="container-fluid">
      <div className="text-center">Loading...</div>
    </div>;
  
  (async () => {
    const res = await fetch("/api/reservations");
    if (!res.ok) {
      location.pathname = "/login";
    } else {
        const reservations = await res.json();

      root.replaceChild(
        <div classList="list????">
          {reservations.map(res => {})}  
        </div>
        ) 
    }
  })();

  return root;
}
