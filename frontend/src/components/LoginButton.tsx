import Enact from "../Enact";

function logout() {
  (async () => {
    const loggedout = await fetch("/api/auth/logout");
    location.pathname = "/campus";
  })();
}

export default function LoginButton() {
  //let output =  document.createElement('div') as HTMLElement
  const root = <div />;

  (async () => {
    const res = await fetch("/api/auth");
    console.log(res.status);
    if (res.ok) {
      const { email, firstName, id, lastName } = await res.json();
      const button = (
        <a role="button" className="btn btn-primary">
          Hello {firstName} {lastName}!
        </a>
      );
      root.appendChild(button);

      const logout = (
        <a
          role="button"
          href="/login"
          className="btn btn-primary"
          onClick={async () => {
            const loggedout = await fetch("/api/auth/logout", {
              method: "POST",
            });
          }}
        >
          Log Out
        </a>
      );
      root.appendChild(logout);
    } else {
      const login = (
        <a role="button" href="/login" className="btn btn-primary">
          Log In
        </a>
      );
      root.appendChild(login);
    }
  })();
  return root;
}
