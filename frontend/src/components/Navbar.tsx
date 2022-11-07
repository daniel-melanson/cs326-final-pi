import Enact from "../Enact";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid justify-content-center">
        <a class="navbar-brand" href="#">
          <i class="bi-image"></i> Campus Meet
        </a>
        <form class="col-3 d-flex" role="search">
          <input type="search" class="form-control me-2" placeholder="Search" />
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
        <a class="navbar-brand mx-3" href="#">
          <i class="bi-person-circle"></i>
        </a>
      </div>
    </nav>
  );
}
