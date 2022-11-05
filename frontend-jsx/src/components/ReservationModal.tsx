import { Modal } from "bootstrap";
import Enact from "../Enact";

interface DropDownButtonProps {
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

function confirmEvent(id : string){
    console.log(JSON.parse(id))
    let event_title = document.getElementById(id + "event-name") as HTMLInputElement;
    let event_description = document.getElementById(id + "message-text")  as HTMLInputElement;
    console.log(event_description?.value, event_title?.value);
    closeModal(id);
}
export default function ReservationModal(props: DropDownButtonProps) {
  let id = {'room' : props.room, 'building': props.building, 'start':props.start_date, 'end' : props.end_date, 'date': props.date};

  let uniqueid = JSON.stringify(id);
  setTimeout(() => triggerModal(uniqueid), 100);
  //setTimeout( () => closeModal(uniqueid), 2000);
  const closeButtonId = uniqueid + "closeButton";
  const confirmButtonId = uniqueid + "confirmButton";
  setTimeout(
    () =>
      document
        .getElementById(confirmButtonId)
        ?.addEventListener("click", () =>  confirmEvent(uniqueid)),
    200
  );

  setTimeout(
    () =>
      document
        .getElementById(closeButtonId)
        ?.addEventListener("click", () => closeModal(uniqueid)),
    200
  );


  return (
    <div
      class="modal fade"
      id={uniqueid}
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="container-fluid justify-content-center">
              <h3 class="modal-title " id="exampleModalLabel">
                Request Room
              </h3>
              <label id="exampleModalLabel">
                {props.room}, {props.start_date} - {props.end_date} on{" "}
                {props.date}
              </label>
            </div>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">
                  Event Title:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id={uniqueid +"event-name"}
                ></input>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Description:
                </label>
                <textarea class="form-control" id={uniqueid + "message-text"}></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id = {uniqueid+'confirmButton'}>
              Confirm
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              id={uniqueid + "closeButton"}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
