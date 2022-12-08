import Enact from "../Enact";
import ReservationModal from "./ReservationModal";
import { formatDateAsTime } from "./util";

interface BuildingProps {
  details: APIAvailability;
}

export default function Building(props: BuildingProps) {
  const { details } = props;
  const building = details.building;

  const url = new URL("https://maps.google.com/maps?q=UMass%20Amherst%20ILC&z=16&ie=UTF8&iwloc=&output=embed");

  url.searchParams.set("q", building.address);
  const accordionId = "building-accordion-" + building.id;
  return (
    <div className="card mb-3">
      <h5 className="card-header">{building.name}</h5>
      <div className="card-body row">
        <div className="col">
          <i className="bi-geo-alt"> {building.address}</i>
          <br />
          <br />
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width="255"
                height="255"
                src={url.toString()}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="accordion" id={accordionId}>
            {details.roomAvailabilities.map(avail => {
              const headerId = "room-header-" + avail.room.id;
              const bodyId = "room-body" + avail.room.id;

              return (
                <div className="accordion-item">
                  <h2 className="accordion-header" id={headerId}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#" + bodyId}
                      aria-expanded="false"
                      aria-controls={bodyId}
                    >
                      <i className="bi-hash">{avail.room.number}</i>
                    </button>
                  </h2>
                  <div
                    id={bodyId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headerId}
                    data-bs-parent={accordionId}
                  >
                    <div className="accordion-body">
                      <i className="bi-box2"> {avail.room.capacity < 5 ? "Unknown" : avail.room.capacity}</i>
                      <br />
                      <i className="bi-text-paragraph"> {avail.room.features || "No known features."}</i>
                      <div className="list-group list-group-flush">
                        {avail.availabilities.map(listing => {
                          const startDate = new Date(listing.startDate);
                          const endDate = new Date(listing.endDate);
                          const start = formatDateAsTime(new Date(startDate));
                          const end = formatDateAsTime(new Date(endDate));

                          return (
                            <li className="list-group-item d-flex justify-content-around text-center">
                              <div>
                                {start} - {end}
                              </div>
                              <button
                                type="button"
                                className={"btn btn-sm btn-primary"}
                                disabled={endDate.getTime() < new Date().getTime()}
                                onClick={async () => {
                                  const res = await fetch("/api/auth");
                                  if (!res.ok) {
                                    location.pathname = "/login";
                                  } else {
                                    return (
                                      <ReservationModal
                                        startDate={startDate}
                                        endDate={endDate}
                                        date={new Date(listing.startDate).toLocaleDateString()}
                                        buildingName={building.name}
                                        roomNumber={avail.room.number}
                                        roomId={avail.room.id}
                                      />
                                    );
                                  }
                                }}
                              >
                                Book
                              </button>
                            </li>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
