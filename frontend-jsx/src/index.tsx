import Enact from "./Enact";

function Root() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <div>
          This is some content
      </div>
      <h2>More stuff!</h2>
    </div>
  );
}

document.body.appendChild(<Root />);