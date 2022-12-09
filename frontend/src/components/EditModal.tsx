import { Modal } from "bootstrap";
import Enact from "../Enact";
import { formatDateAsTime } from "./util";

interface ReservationModalProps extends APIProfileEvents {
  onEdit: () => void;
}

export default function EditModal(props: ReservationModalProps) {
  console.log(props);

  const modalElement = (
    <div className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container-fluid justify-content-center">
              <h3 className="modal-title " id="exampleModalLabel">
                Edit Reservation
              </h3>
              <label>
                {props.room.building.name} {props.room.number}, {formatDateAsTime(new Date(props.startTime))} -{" "}
                {formatDateAsTime(new Date(props.endTime))} on {new Date(props.startTime).toLocaleDateString()}
              </label>
            </div>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Event Title:
                </label>
                <input className="form-control title" id="res-title" value={props.title} />
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea className="form-control description" id="res-description">
                  {props.description}
                </textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                try {
                  const created_event = await fetch("/api/reservations/" + props.id, {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      title: (document.getElementById("res-title") as HTMLInputElement)?.value ?? "",
                      description: (document.getElementById("res-description") as HTMLInputElement).value ?? "",
                    }),
                  });

                  props.onEdit();
                } catch (e) {
                  console.log(e);
                }
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

                setTimeout(() => modal.dispose(), 5000);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const modal = new Modal(modalElement);
  modal.show();

  return modalElement;
}
