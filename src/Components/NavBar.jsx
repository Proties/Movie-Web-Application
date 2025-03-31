import { useState } from "react";
import { Link } from "react-router-dom"
import "../Css/Navbar.css"
import logo from "../img/logo.png"; // Import from the img folder


function NavBar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    
    return <nav className="navbar">
        <div className="navcontainer">
            <div className="navgridcontianer">
                <div className="grid-logo-section">
                    <div className="navbar-brand">
                    <Link to="/">
                            <img src={logo} alt="Movie App Logo" className="navbar-logo" />
                        </Link>
                    </div>
                </div>

                <div className="grid-links-section">
                    <div className="mainlinks">
                        <div className="navbar-links">
                            <Link to="/" className="nav-link">Movie List</Link>
                        </div>
                    </div>
                    <div className="profile-link">
                        <div className="profile-container">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </div>
                         {/* Burger Menu Icon (visible on mobile) */}
                         <div className="menu-btn-container">
                         <button className="burger-menu" onClick={toggleMenu}>
                            &#9776;
                            </button>
                         </div>
                    
                    </div>
                    </div>                    
                </div>
            </div> 

            {/* Collapsible burger menu section, placed below navbar */}
{menuOpen && (
    <div className="burger-menu-links">
      <div className="menu-links">
        <div className="menu-link-containers">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Movie List</Link>
        </div>
        <div className="menu-link-containers">
             <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>Profile</Link>
        </div>
      </div>
    </div>
  )} 
    </nav>

}

export default NavBar