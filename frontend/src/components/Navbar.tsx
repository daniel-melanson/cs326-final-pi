import Enact from "../Enact";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid justify-content-center">
        <a className="navbar-brand" href="#">
          <i className="bi-image"></i> Campus Meet
        </a>
        <form className="col-3 d-flex" role="search">
          <input type="search" className="form-control me-2" placeholder="Search" />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
        <a className="navbar-brand mx-3" href="#">
          <i className="bi-person-circle"></i>
        </a>
      </div>
    </nav>
  );
}
