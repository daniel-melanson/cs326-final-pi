import bootstrap from "bootstrap";
import Enact from "../Enact";
import $ from "jquery"
import { Modal } from 'bootstrap';

interface DropDownButtonProps {

    callback?: () => void;

  start_date: string;
  end_date: string;
  building: string;
  room: string;
}


function triggerModal(id:string){
    const element = document.getElementById(id) as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  
}

function closeModal(id:string){

}
export default function ReservationModal(props : DropDownButtonProps){
    // set timeout. 
    return(
        <div class="modal fade" id={props.room + props.building + props.start_date + props.end_date} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                        <input type="text" class="form-control" id="recipient-name"></input>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
                </div>
            </div>
        </div>
  );
}
