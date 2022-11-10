import Enact from "../Enact";
import ReservationModal from "./ReservationModal";
import { formatDateAsTime } from "./util";

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
  roomId: string;
  availabilities: RoomAvailabilities[];
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
                <i className="bi-building"> {props.building}</i>
                <br />
                <i className="bi-hash"> {props.number}</i>
                <br />
                <i className="bi-geo-alt"> {props.address}</i>
                <br />
                <i className="bi-box2"> {props.capacity}</i>
                <br />
                <i className="bi-text-paragraph"> {props.description}</i>
              </div>
              <div class="col card p-0">
                <ul id="room-list" class="list-group list-group-flush">
                  {props.availabilities.map((avail) => {
                    const start = formatDateAsTime(avail.start_date);
                    const end = formatDateAsTime(avail.end_date);

                    return (
                      <li class="list-group-item d-flex justify-content-around">
                        {start} - {end}
                        <button
                          type="button"
                          class="btn btn-sm btn-primary"
                          onClick={() => (
                            <ReservationModal
                              startDate={avail.start_date}
                              endDate={avail.end_date}
                              date={avail.start_date.toLocaleDateString()}
                              buildingName={props.building}
                              roomNumber={props.number}
                              roomId={props.roomId}
                            />
                          )}
                        >
                          Book
                        </button>
                      </li>
                    );
                  })}
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
