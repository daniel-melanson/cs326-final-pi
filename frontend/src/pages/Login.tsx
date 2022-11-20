import Enact from "../Enact";

export default function Login() {
  return (
    <div>
      <section id="login" class="vh-100 umass-background">
        <div class="d-flex align-items-center h-100 blurred-backdrop">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card">
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Login</h2>
                    <div class="alert alert-danger d-flex align-items-center visually-hidden" role="alert">
                      <div>
                        <i class="bi-exclamation-triangle-fill"> Invalid</i>
                      </div>
                    </div>
                    <form>
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary btn-block btn-lg">
                          Login
                        </button>
                      </div>
                      <p class="text-center text-muted mt-3 mb-0">
                        Don't have an account?{" "}
                        <a href="signup" class="fw-bold text-body">
                          <u class="text-primary">Sign up here</u>
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
