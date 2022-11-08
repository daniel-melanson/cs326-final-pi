import Enact from "../Enact";

function Room() {
  return (
    <div className="row card mb-3">
      <div className="col px-0">
        <h5 className="container card-header">
          <div className="row">
            <div className="col-8">Integrative Learning Center - S151</div>
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
                <i className="bi bi-building"></i> Integrative Learning Center
                <br />
                <i className="bi bi-geo-alt"></i> 650 North Pleasant Street. Amherst, MA 01003-1100
                <br />
                <i className="bi bi-hash"></i> S151
                <br />
                <i className="bi bi-boxes"></i> 300+ Seats
                <br />
                <i className="bi bi-text-paragraph"></i> Lecture hall. Equipped with projectors.
              </div>
              <div className="col card p-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-around">
                    5:00pm-7:00pm
                    <button type="button" className="btn btn-sm btn-primary">
                      Book
                    </button>
                  </li>
                  <li className="list-group-item d-flex justify-content-around">
                    5:00pm-7:00pm
                    <button type="button" className="btn btn-sm btn-primary">
                      Book
                    </button>
                  </li>
                  <li className="list-group-item d-flex justify-content-around">
                    5:00pm-7:00pm
                    <button type="button" className="btn btn-sm btn-primary">
                      Book
                    </button>
                  </li>
                  <li className="list-group-item d-flex justify-content-around">
                    5:00pm-7:00pm
                    <button type="button" className="btn btn-sm btn-primary">
                      Book
                    </button>
                  </li>
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

export default function RoomList() {
  return <div>RoomListings</div>;
}
