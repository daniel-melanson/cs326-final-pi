import Enact from "../Enact";

export default function SignUp() {
  async function signup() {
    const id = (id: string) => document.getElementById(id) as HTMLInputElement;

    const firstNameInput = id("firstName"),
      lastNameInput = id("lastName"),
      emailInput = id("email"),
      passwordInput = id("password"),
      passwordConfirm = id("passwordConfirm");

    const warningContainer = document.getElementById("warningContainer")!;
    const warningContent = document.getElementById("warningContent")!;

    if (passwordInput.value !== passwordConfirm.value) {
      warningContainer.classList.remove("visually-hidden");
      warningContent.innerText = " Passwords do not match";
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        console.log(json);
        warningContent.innerText = ` Error: ${json.errors[0].msg} for ${json.errors[0].param}`;
        warningContainer.classList.remove("visually-hidden");
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
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <div
                      id="warningContainer"
                      className="alert alert-danger d-flex align-items-center visually-hidden"
                      role="alert"
                    >
                      <div>
                        <i id="warningContent" className="bi-exclamation-triangle-fill">
                          {" "}
                          Invalid
                        </i>
                      </div>
                    </div>
                    <form>
                      <div className="row g-2 mb-3">
                        <div className="col-md">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="firstName" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">First Name</label>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
                            <label htmlFor="floatingInput">Last Name</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="passwordConfirm"
                          placeholder="Confirm Password"
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-primary btn-block btn-lg" onClick={signup}>
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-3 mb-0">
                        Already have an account?{" "}
                        <a href="login" className="fw-bold text-body">
                          <u className="text-primary">Login here</u>
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
