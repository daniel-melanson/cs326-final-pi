import Enact from "../Enact";

interface BuildingParams {
  parameters: { id: string };
}

export default function Building(props: BuildingParams) {
  return <div>Building: {props.parameters.id}</div>;
}
