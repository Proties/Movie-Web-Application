import { Link } from "react-router-dom"
import "../Css/Navbar.css"
import logo from "../img/logo.png"; // Import from the img folder


function NavBar() {
    return <nav className="navbar">
        <div className="navcontainer">
            <div className="navgridcontianer">
                <div className="gridleft">
                    <div className="navbar-brand">
                    <Link to="/">
                            <img src={logo} alt="Movie App Logo" className="navbar-logo" />
                        </Link>
                    </div>
                    <div className="gridleftcenter">
                    </div>
                </div>
                <div className="gridcenter">
                    <div className="navbar-links">
                        <Link to="/" className="nav-link">Movie List</Link>
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </div>

                </div>
                <div className="gridright">
                </div>




                
                
            </div>       
        </div>
        
    </nav>
}

export default NavBar