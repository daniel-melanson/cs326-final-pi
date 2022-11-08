import Enact from "../Enact";

interface DropDownButtonProps {
  name: string;
  options: string[];
  icon: string;
}

export default function DropdownButton(props: DropDownButtonProps) {
  return (
    <button
      type="button"
      className="col mx-1 btn btn-outline-dark filter-category"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-placement="bottom"
      data-bs-content={props.name}
    >
      <div className="container px-0">
        <div className="row">
          <div className="col px-2 text-start">{props.name}</div>
          <div className="col px-2">
            <div className="d-flex justify-content-end">
              <div>
                <i className={"bi-" + props.icon}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
