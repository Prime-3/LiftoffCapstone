import "./Footer.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
   const [user, setUser] = useState()

   useEffect(() => {
      fetch("/pingauth")
         .then((resp) => {
            if (resp.ok) {

               return resp.json();
            } else {
               return null
            }
         })
         .then((data) => {
            console.log(data);
            setUser(data)
            return data;
         })
   })


   return (
      <div id="footer-container">
         <div id="footer-title-socials">
            <div>
               <h2>STL Markets&#8482;</h2>
            </div>
            <div id="footer-socials">
               <a href="https://www.facebook.com/tgfarmersmarket/"><i class="fa-brands fa-facebook" /></a>
               <a href="https://x.com/tgfarmersmarket"><i class="fa-brands fa-instagram" /></a>
               <a href="https://www.instagram.com/tgfarmersmarket/"><i class="fa-brands fa-x-twitter" /></a>
            </div>
         </div>
         <ul id="site-map">
            <h5>Site Map</h5>
            <div id="site-map-links">
               {user ?
                  (
                     <>
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
                     </>

                  )
                  :
                  (
                     <>
                        <div>
                           <li>
                              <Link to="/">Home</Link>
                           </li>
                        </div>
                        <div>
                           <li>
                              <Link to="/browse">Browse</Link>
                           </li>
                        </div>
                     </>
                  )}
            </div>
         </ul>
      </div>
   )
}

export default Footer;
