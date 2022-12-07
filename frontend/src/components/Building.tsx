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
    <div class="card mb-3">
      <h5 class="card-header">{building.name}</h5>
      <div class="card-body row">
        <div className="col">
          <i className="bi-geo-alt"> {building.address}</i>
          <br />
          <br />
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="255"
                height="255"
                src={url.toString()}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="accordion" id={accordionId}>
            {details.roomAvailabilities.map(avail => {
              const headerId = "room-header-" + avail.room.id;
              const bodyId = "room-body" + avail.room.id;

              return (
                <div class="accordion-item">
                  <h2 class="accordion-header" id={headerId}>
                    <button
                      class="accordion-button collapsed"
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
                    class="accordion-collapse collapse"
                    aria-labelledby={headerId}
                    data-bs-parent={accordionId}
                  >
                    <div class="accordion-body">
                      <i className="bi-box2"> {avail.room.capacity < 5 ? "Unknown" : avail.room.capacity}</i>
                      <br />
                      <i className="bi-text-paragraph"> {avail.room.features || "No known features."}</i>
                      <div class="list-group list-group-flush">
                        {avail.availabilities.map(listing => {
                          const start = formatDateAsTime(new Date(listing.startDate));
                          const end = formatDateAsTime(new Date(listing.endDate));

                          return (
                            <li class="list-group-item d-flex justify-content-around">
                              {start} - {end}
                              <button
                                type="button"
                                class="btn btn-sm btn-primary"
                                onClick={(async () => {   
                                  const res = await fetch("/api/auth");
                                  console.log(res.status);
                                  console.log("I was here")
                                  if(!res.ok){
                                    location.pathname = '/login'
                                  } else {
                                    return (
                                    <ReservationModal
                                      startDate={new Date(listing.startDate)}
                                      endDate={new Date(listing.endDate)}
                                      date={new Date(listing.startDate).toLocaleDateString()}
                                      buildingName={building.name}
                                      roomNumber={avail.room.number}
                                      roomId={avail.room.id}
                                    /> )
                                }})}
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
