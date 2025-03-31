import { Link } from "react-router-dom"
import "../Css/Footer.css"
import Icon from "../img/Icon.png"; // Import from the img folder
import Twitter from "../img/X.png";
import Instagram from "../img/Instagram.png";
import Youtube from "../img/YouTube.png";
import Tiktok from "../img/Tiktok.png";
import Email from "../img/Email.png";

function Footer() {
    return <div className="footer">
        <div className="social">
            <div className="socials-container">
            <img src={Twitter} alt="Twitter Button" className="social-icon" />
            <img src={Instagram} alt="Instagram Button" className="social-icon" />
            <img src={Youtube} alt="Youtube Button" className="social-icon" />
            <img src={Tiktok} alt="Tiktok Button" className="social-icon" />
            <img src={Email} alt="Email Button" className="social-icon" />

            </div>
        </div>
        <div className="footer-icon-container">
            <div className="left-icon-container">

            </div>
            <div className="center-icon-continer">
             <img src={Icon} alt="Kopia Icon" className="icon" />
            </div>
            <div className="right-icon-container">

            </div>            
        </div>
        <div className="footer-copyright-container">
            <p className="copyright">
            Copyright © 2025 Kopia: The Creative Hub
            </p>
        </div>
    </div>

}

export default Footer;