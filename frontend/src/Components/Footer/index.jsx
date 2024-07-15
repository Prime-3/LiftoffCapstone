import "./Footer.css"

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
                     <a href="/">Home</a>
                  </li>
                  <li>
                     <a href="/">Account</a>
                  </li>
               </div>
               <div>
                  <li>
                     <a href="/browse">Browse</a>
                  </li>
                  <li>
                     <a href="/">Contact</a>
                  </li>
               </div>
            </div>
         </ul>
      </div>
   )
}

export default Footer;