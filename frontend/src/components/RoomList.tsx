import Enact from "../Enact";

interface RoomDetails {
    name: string;
    address: string;
    timings: number[][];
    /* capacity: number;
     * features: string; */
}

function roomTimings(data: number[][]) {
    let result = "";
    for (const time of data) {
        console.log(time);
        const startTime = time[0];
        const endTime = time[1];

        const list = document.createElement("li");
        list.classList.add("list-group-item", "d-flex", "justify-content-around");
        list.innerHTML = startTime + "-" + endTime;

        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-sm", "btn-primary");
        button.innerHTML = "Book";

        list.appendChild(button);
        result += list.outerHTML;
    }
    return result;
}
        
function Room(data: RoomDetails) {
    return (
        <div class="row card mb-3">
            <div class="col px-0">
                <h5 class="container card-header">
                    <div class="row">
                        <div class="col-8">{data["name"]}</div>
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
                                <i class="bi bi-geo-alt"></i> 650 North Pleasant Street.
                                Amherst, MA 01003-1100
                                <br />
                                <i class="bi bi-hash"></i> S151
                                <br />
                                <i class="bi bi-boxes"></i> 300+ Seats
                                <br />
                                <i class="bi bi-text-paragraph"></i> Lecture hall.
                                Equipped with projectors.
                            </div>
                            <div class="col card p-0">
                                <ul id="room-list" class="list-group list-group-flush">
                                    {roomTimings(JSON.parse(data["timings"]))}
                                    {/* <li
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
                                        </li> */}
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

export default function RoomList() {
    return (
        <Room
            name    ="LGRC"
            address ="amity street"
            timings ="[[5, 7], [13, 15], [22, 24]]"
        />
    );
}
