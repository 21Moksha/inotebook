import { React, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {

  let history=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history("/login");
    props.showAlert("Logged Out Successfully","success")
  }

  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem('token')?<div className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
          </div>:<button className="btn btn-primary mx-2" onClick={handleLogout} >Logout</button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
