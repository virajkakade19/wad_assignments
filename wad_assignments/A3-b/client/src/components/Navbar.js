import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse left" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/ws">Workspace</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
            </ul>
          </div>
      </div>
    </nav>
    </>
  )
}
export default Navbar;