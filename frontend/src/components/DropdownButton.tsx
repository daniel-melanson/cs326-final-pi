import Enact from "../Enact";

export type DropdownOption = [string, string];

interface DropdownButtonProps {
  name: string;
  options: DropdownOption[];
  icon: string;
}

export default function DropdownButton(props: DropdownButtonProps) {
  return (
    <div className="dropdown px-1 py-3">
      <button
        type="button"
        disabled={props.options.length === 0}
        className="btn btn-outline-dark"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {props.name}
        <i className={`ps-4 bi-${props.icon}`} />
      </button>
      <ul className="dropdown-menu">
        {props.options.map(([choice, value]) => (
          <li key={value} className="dropdown-item">
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
}
