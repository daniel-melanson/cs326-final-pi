import Navbar from "../components/Navbar";
import Enact from "../Enact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div class="container-fluid vertical-center justify-content-center">
        <div class="d-flex justify-content-center align-items-center flex-column text-center">
          <h1 class="display-5 fw-bold">Campus Meet</h1>
          <div class="col-8">
            <p class="lead">Need a room? Campus Meet helps you find empty rooms on UMass' Campus.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <a type="button" class="btn btn-primary btn-lg px-4" href="/campus">
                Find Rooms
              </a>
              <a type="button" class="btn btn-outline-secondary btn-lg px-4" href="/signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
