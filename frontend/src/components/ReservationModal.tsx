import { Modal } from "bootstrap";
import Enact from "../Enact";

interface ModalReservationProps {
  callback?: () => void;

  start_date: string;
  end_date: string;
  building: string;
  room: string;
  date: string;
}

const modals: Record<string, Modal> = {};

function triggerModal(id: string) {
  const element = document.getElementById(id) as HTMLElement;
  const myModal = new Modal(element);
  modals[id] = myModal;
  myModal.show();
}

function closeModal(id: string) {
  const myModal = modals[id];
  //myModal.hide();
  myModal.hide();
  myModal.toggle();
}

function confirmEvent(id: string) {
  console.log(JSON.parse(id));
  const event_title = document.getElementById(id + "event-name") as HTMLInputElement;
  const event_description = document.getElementById(id + "message-text") as HTMLInputElement;
  console.log(event_description?.value, event_title?.value);

  // combine event stuff + user info and send it over.
  closeModal(id);
}
export default function ReservationModal(props: ModalReservationProps) {
  const id = {
    room: props.room,
    building: props.building,
    start: props.start_date,
    end: props.end_date,
    date: props.date,
  };

  const uniqueid = JSON.stringify(id);
  setTimeout(() => triggerModal(uniqueid), 100);
  //setTimeout( () => closeModal(uniqueid), 2000);
  const closeButtonId = uniqueid + "closeButton";
  const confirmButtonId = uniqueid + "confirmButton";
  setTimeout(
    () => document.getElementById(confirmButtonId)?.addEventListener("click", () => confirmEvent(uniqueid)),
    200
  );

  setTimeout(() => document.getElementById(closeButtonId)?.addEventListener("click", () => closeModal(uniqueid)), 200);

  return (
    <div
      className="modal fade"
      id={uniqueid}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container-fluid justify-content-center">
              <h3 className="modal-title " id="exampleModalLabel">
                Request Room
              </h3>
              <label id="exampleModalLabel">
                {props.room}, {props.start_date} - {props.end_date} on {props.date}
              </label>
            </div>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Event Title:
                </label>
                <input type="text" className="form-control" id={uniqueid + "event-name"}></input>
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea className="form-control" id={uniqueid + "message-text"}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" id={uniqueid + "confirmButton"}>
              Confirm
            </button>
            <button type="button" className="btn btn-secondary" id={uniqueid + "closeButton"}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
