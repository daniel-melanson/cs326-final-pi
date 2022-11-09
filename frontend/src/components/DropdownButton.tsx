import Enact from "../Enact";

export type DropdownOption = [string, string];

interface DropdownButtonProps {
  key: string;
  options: DropdownOption[];
  icon: string;
  selected?: number;
  onSelected: (index?: number) => void;
}

export default function DropdownButton(props: DropdownButtonProps) {
  const selection = props.selected !== undefined && props.options[props.selected];
  return (
    <div className="dropdown px-1 py-3">
      <button
        type="button"
        disabled={props.options.length === 0}
        className={selection ? "btn btn-primary" : "btn btn-outline-dark"}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selection ? selection[0] : props.key}
        <i className={`ps-4 bi-${props.icon}`} />
      </button>
      <ul className="dropdown-menu">
        <li
          className={selection ? "dropdown-item" : "dropdown-item active"}
          onClick={() => selection && props.onSelected(undefined)}
        >
          None
        </li>
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
