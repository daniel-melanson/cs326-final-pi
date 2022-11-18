import Enact from "../Enact";

export default function SignUp() {
  return (
    <div>
      <section id="login" class="vh-100 bg-image">
        <div class="d-flex align-items-center h-100 -custom-3">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card">
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                    <div class="alert alert-danger d-flex align-items-center visually-hidden" role="alert">
                      <div>
                        <i class="bi-exclamation-triangle-fill"> Invalid</i>
                      </div>
                    </div>
                    <form>
                      <div class="form-outline mb-4">
                        <input type="email" id="email" class="form-control form-control-lg" />
                        <label class="form-label" for="email">
                          Email
                        </label>
                      </div>
                      <div class="form-outline mb-4">
                        <input type="password" id="password" class="form-control form-control-lg" />
                        <label class="form-label" for="password">
                          Password
                        </label>
                      </div>
                      <div class="form-outline mb-4">
                        <input type="password" id="repeat" class="form-control form-control-lg" />
                        <label class="form-label" for="repeat">
                          Repeat your password
                        </label>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary btn-block btn-lg">
                          Register
                        </button>
                      </div>
                      <p class="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="login" class="fw-bold text-body">
                          <u class="text-primary">Login here</u>
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
