import Enact from "../Enact";
import ReservationModal from "./ReservationModal";
import { formatDateAsTime } from "./util";

export interface RoomAvailabilities {
  startDate: Date;
  endDate: Date;
}

interface RoomProps {
  building: string;
  number: string;
  capacity: string | number;
  address: string;
  description: string;
  roomId: string | number;
  availabilities: RoomAvailabilities[];
}

export default function Room(props: RoomProps) {
  return (
    <div className="row card mb-3">
      <div className="col px-0">
        <h5 className="container card-header">
          <div className="row">
            <div className="col-8">
              {props.building} - {props.number}
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-outline-primary ms-2">
                View Calendar
              </button>
            </div>
          </div>
        </h5>
        <div className="card-body p-0">
          <div className="container">
            <div className="row">
              <div className="col pt-1">
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
              <div className="col card p-0">
                <ul id="room-list" className="list-group list-group-flush">
                  {props.availabilities.map(avail => {
                    const start = formatDateAsTime(avail.startDate);
                    const end = formatDateAsTime(avail.endDate);

                    return (
                      <li className="list-group-item d-flex justify-content-around">
                        {start} - {end}
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={async () => {
                            const res = await fetch("/api/auth");
                            console.log(res.status);
                            if (!res.ok) {
                              location.pathname = "/login";
                            } else {
                              return (
                                <ReservationModal
                                  startDate={avail.startDate}
                                  endDate={avail.endDate}
                                  date={avail.startDate.toLocaleDateString()}
                                  buildingName={props.building}
                                  roomNumber={props.number}
                                  roomId={props.roomId}
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
                </ul>
              </div>
              <div className="col pe-0 d-flex justify-content-end">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="255"
                      height="255"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=UMass%20Amherst%20ILC&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
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
