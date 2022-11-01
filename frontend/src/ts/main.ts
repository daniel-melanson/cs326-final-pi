import * as bootstrap from "bootstrap";

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = Array.from(popoverTriggerList).map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);


window.onload = function() {
  const tileGrid = document.getElementById("tilewindow")

  tileGrid?.appendChild(classTile("bulding", "room", "address", 300, "description", "wef"));

}

function classTile(building: string, room: string, address: string, capacity: number, description: string, avaiablity: string){
  const tile = document.createElement("div");
  tile.innerHTML = `<div class="row card mb-3">
                      <div class="col px-0">
                        <h5 class="container card-header">
                          <div class="row">
                            <div class="col-8">${building} - ${room}</div>
                            <div class="col-4 d-flex justify-content-end">
                              <button
                                type="button"
                                class="btn btn-sm btn-outline-primary ms-2"
                              >
                                View Calendar
                              </button>
                            </div>
                          </div>
                        </h5>
                        <div class="card-body p-0">
                          <div class="container">
                            <div class="row">
                              <div class="col pt-1">
                                <i class="bi bi-building"></i> Integrative Learning Center
                                <br />
                                <i class="bi bi-geo-alt"></i> ${address}
                                <br />
                                <i class="bi bi-hash"></i> ${room}
                                <br />
                                <i class="bi bi-boxes"></i> ${capacity}+ Seats
                                <br />
                                <i class="bi bi-text-paragraph"></i> ${description}
                              </div>
                              <div class="col card p-0">
                                <ul class="list-group list-group-flush">
                                  <li
                                    class="list-group-item d-flex justify-content-around"
                                  >
                                    5:00pm-7:00pm
                                    <button type="button" class="btn btn-sm btn-primary">
                                      Book
                                    </button>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-around"
                                  >
                                    5:00pm-7:00pm
                                    <button type="button" class="btn btn-sm btn-primary">
                                      Book
                                    </button>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-around"
                                  >
                                    5:00pm-7:00pm
                                    <button type="button" class="btn btn-sm btn-primary">
                                      Book
                                    </button>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-around"
                                  >
                                    5:00pm-7:00pm
                                    <button type="button" class="btn btn-sm btn-primary">
                                      Book
                                    </button>
                                  </li>
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
                    `
    return tile
}