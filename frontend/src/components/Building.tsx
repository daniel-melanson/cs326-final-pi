import Enact from "../Enact";

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
