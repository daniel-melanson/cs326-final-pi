import Navbar from "../components/Navbar";
import Enact from "../Enact";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid vertical-center justify-content-center">
        <div className="d-flex justify-content-center align-items-center flex-column text-center">
          <h1 className="display-5 fw-bold">Campus Meet</h1>
          <div className="col-8">
            <p className="lead">Need a room? Campus Meet helps you find empty rooms on UMass' Campus.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <a type="button" className="btn btn-primary btn-lg px-4" href="/campus">
                Find Rooms
              </a>
              <a type="button" className="btn btn-outline-secondary btn-lg px-4" href="/signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
