import Enact from "../Enact";

export default function Login() {
  (async () => {
    const timer = await new Promise(f => setTimeout(f, 500));
    const res = await fetch("/api/auth");

    if (res.ok) {
      location.pathname = "/campus";
    }
  })();

  async function login() {
    const emailInput = document.getElementById("emailInput") as HTMLInputElement;
    const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
    const warningContainer = document.getElementById("warningContainer") as HTMLDivElement;
    const warningContent = document.getElementById("warningContent")!;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.value, password: passwordInput.value }),
      });

      if (res.status >= 400 && res.status < 500) {
        if (res.status === 401) {
          warningContent.innerText = ` Error: Incorrect Password or Username`;
          warningContainer.classList.remove("visually-hidden");
        } else {
          const json = await res.json();
          warningContent.innerText = ` Error: ${json.errors[0]}`;
          warningContainer.classList.remove("visually-hidden");
        }
      } else if (res.redirected) {
        location.href = res.url;
      }
    } catch (e) {
      console.log(e);
      warningContent.innerText = " Unknown error occurred.";
      warningContainer.classList.remove("visually-hidden");
    }
  }

  return (
    <div>
      <section id="login" className="vh-100 umass-background">
        <div className="d-flex align-items-center h-100 blurred-backdrop">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                    <div
                      id="warningContainer"
                      className="alert alert-danger d-flex align-items-center visually-hidden"
                      role="alert"
                    >
                      <i id="warningContent" className="bi-exclamation-triangle-fill">
                        {" "}
                        Invalid
                      </i>
                    </div>
                    <form>
                      <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-primary btn-block btn-lg" onClick={login}>
                          Login
                        </button>
                      </div>
                      <p className="text-center text-muted mt-3 mb-0">
                        Don't have an account?{" "}
                        <a href="signup" className="fw-bold text-body">
                          <u className="text-primary">Sign up here</u>
                        </a>
                      </p>
                      <p class="text-center text-muted mt-3 mb-0">
                       Or Continue to {" "}
                        <a href="/campus" class="fw-bold text-body">
                          <u class="text-primary">Browse as Guest</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
