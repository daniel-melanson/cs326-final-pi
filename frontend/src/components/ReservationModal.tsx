import { Modal } from "bootstrap";
import Enact from "../Enact";
import { formatDateAsTime } from "./util";

interface ReservationModalProps {
  buildingName: string;
  roomId: string | number;
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
                <input className="form-control title" id = "res-title" />
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Description:
                </label>
                <textarea className="form-control description" id= "res-description"></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
              
                try{
                  const res = await fetch("/api/auth");
                  const {email, firstName, id, lastName} = await res.json();

                
            
                const created_event = await fetch("/api/reservations", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ roomId: props.roomId,
                                         title : (document.getElementById('res-title') as HTMLInputElement)?.value ?? "",
                                         description : (document.getElementById('res-description') as HTMLInputElement).value ?? "",
                                         startTime : props.startDate.toISOString(),
                                         endTime: props.endDate.toISOString(),
                                         ownerId : id}),
                });
                console.log(created_event.status);
                } catch(e){
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
