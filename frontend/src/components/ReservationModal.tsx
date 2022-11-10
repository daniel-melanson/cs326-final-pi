import { Modal } from "bootstrap";
import Enact from "../Enact";
import { formatDateAsTime } from "./util";

interface ReservationModalProps {
  buildingName: string;
  roomId: string;
  roomNumber: string;
  startDate: Date;
  endDate: Date;
  date: string;
}

export default function ReservationModal(props: ReservationModalProps) {
  let modal: Modal;
  const modalElement = (
    <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container-fluid justify-content-center">
              <h3 className="modal-title " id="exampleModalLabel">
                Reserve Room
              </h3>
              <label>
                {props.buildingName} {props.roomNumber}, {formatDateAsTime(props.startDate)} -{" "}
                {formatDateAsTime(props.endDate)} on {props.date}
              </label>
            </div>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Event Title:
                </label>
                <input type="text" className="form-control title" />
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea className="form-control description"></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const url = new URL("/api/events", document.baseURI);

                url.searchParams.append("room_id", props.roomId);
                url.searchParams.append("title", modalElement.querySelector(".description")?.textContent ?? "");
                url.searchParams.append("description", modalElement.querySelector(".title")?.textContent ?? "");
                url.searchParams.append("start_time", props.startDate.toISOString());
                url.searchParams.append("end_time", props.endDate.toISOString());

                fetch(url.toString(), { method: "POST" });
                modal.hide();
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                modal.hide();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  modal = new Modal(modalElement);
  modal.show();

  return modalElement;
}
