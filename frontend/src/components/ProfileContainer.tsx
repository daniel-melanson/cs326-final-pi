import Enact from "../Enact";
import EditModal from "./EditModal";
import { formatDateAsTime } from "./util";

export default function ProfileContainer() {
  const root = (
    <div className="container-fluid d-flex justify-content-center">
      <div className="text-center">Loading...</div>
    </div>
  );

  async function updateEvents() {
    const res = await fetch("/api/reservations");
    if (!res.ok) {
      location.pathname = "/login";
    } else {
      const reservations: APIProfileEvents[] = await res.json();

      root.replaceChild(
        reservations.length === 0 ? (
          <div className="d-flex flex-column">
            <h4 className="text-center">You do not have any reservations!</h4>
            <a className="btn btn-primary align-self-center" href="/campus">
              You can make some here!
            </a>
          </div>
        ) : (
          <div className="col-6 d-flex flex-column">
            <h3 className="align-self-center">Your reserved events:</h3>
            {reservations.map(res => (
              <div className="row-6 align-self-start mb-3">
                <div className="list-group list-group-flush me-3">
                  <i className="bi-building"> {res.room.building.name}</i>
                  <br />
                  <i className="bi-hash"> {res.room.number}</i>
                  <br />
                  <i className="bi-calendar-date">
                    {" " + formatDateAsTime(new Date(res.startTime))} - {formatDateAsTime(new Date(res.endTime))}
                  </i>
                  <i className="bi-fonts"> {res.title}</i>
                  <div className="text-break">
                    <i className="bi-text-paragraph"> {res.description}</i>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary me-1"
                    onClick={() => {
                      return (
                        <EditModal
                          {...res}
                          onEdit={() => {
                            updateEvents();
                          }}
                        />
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={async () => {
                      const response = await fetch("/api/reservations/" + res.id, {
                        method: "DELETE",
                      });

                      if (response.ok) updateEvents();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        root.lastChild!
      );
    }
  }

  updateEvents();

  return root;
}
