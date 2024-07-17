import "./Footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div id="footer-container">
         <div id="footer-title-socials">
            <div>
               <h2>STL Markets&#8482;</h2>
            </div>
            <div id="footer-socials">
               <a href="/"><i class="fa-brands fa-facebook" /></a>
               <a href="/"><i class="fa-brands fa-instagram" /></a>
               <a href="/"><i class="fa-brands fa-x-twitter" /></a>
            </div>
         </div>
         <ul id="site-map">
            <h5>Site Map</h5>
            <div id="site-map-links">
               <div>
                  <li>
                     <Link to="/">Home</Link>
                  </li>
                  <li>
                     <Link to="/">Account</Link>
                  </li>
               </div>
               <div>
                  <li>
                     <Link to="/browse">Browse</Link>
                  </li>
                  <li>
                     <Link to="/favorites">Favorites</Link>
                  </li>
               </div>
            </div>
         </ul>
      </div>
   )
}

export default Footer;
