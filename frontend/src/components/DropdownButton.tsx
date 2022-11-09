import Enact from "../Enact";

export type DropdownOption = [string, string];

interface DropdownButtonProps {
  key: string;
  options: DropdownOption[];
  icon: string;
  selected?: number;
  onSelected: (index: number) => void;
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
        {props.key}
        <i className={`ps-4 bi-${props.icon}`} />
      </button>
      <ul className="dropdown-menu">
        {props.options.map(([choice, value], index) => {
          const isSelected = index === props.selected;
          return (
            <li
              key={value}
              className={isSelected ? "dropdown-item active" : "dropdown-item"}
              onClick={() => !isSelected && props.onSelected(index)}
            >
              {choice}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
