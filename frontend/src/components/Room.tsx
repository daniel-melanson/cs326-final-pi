import Enact from "../Enact";

export interface RoomAvailabilities {
  start_date: Date;
  end_date: Date;
}

interface RoomProps {
  building: string;
  number: string;
  capacity: string;
  address: string;
  description: string;
  availabilities: RoomAvailabilities[];
}

function formatDate(d: Date): string {
  return d.toLocaleDateString();
}

export default function Room(props: RoomProps) {
  return (
    <div class="row card mb-3">
      <div class="col px-0">
        <h5 class="container card-header">
          <div class="row">
            <div class="col-8">
              {props.building} - {props.number}
            </div>
            <div class="col-4 d-flex justify-content-end">
              <button type="button" class="btn btn-sm btn-outline-primary ms-2">
                View Calendar
              </button>
            </div>
          </div>
        </h5>
        <div class="card-body p-0">
          <div class="container">
            <div class="row">
              <div class="col pt-1">
                <i class="bi bi-building"></i> {props.building}
                <br />
                <i class="bi bi-geo-alt"></i> {props.address}
                <br />
                <i class="bi bi-hash"></i> {props.number}
                <br />
                <i class="bi bi-boxes"></i> {props.capacity}
                <br />
                <i class="bi bi-text-paragraph"></i> {props.description}
              </div>
              <div class="col card p-0">
                <ul id="room-list" class="list-group list-group-flush">
                  {props.availabilities.map((avail) => (
                    <li class="list-group-item d-flex justify-content-around">
                      {formatDate(avail.start_date)} - {formatDate(avail.end_date)}
                      <button type="button" class="btn btn-sm btn-primary">
                        Book
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="col pe-0 d-flex justify-content-end">
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <iframe
                      width="255"
                      height="255"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=UMass%20Amherst%20ILC&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
