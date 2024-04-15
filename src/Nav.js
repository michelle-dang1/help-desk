import { NavLink } from "react-router-dom";

function Nav() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
            <NavLink className="nav-link navbar-nav" to="/">Home</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link navbar-nav" to="/admin">Admin</NavLink>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    )
}
export default Nav
