import "./LandingPage.css"
import { Link } from "react-router-dom";

const LandingPage = () => {
   window.scrollTo(0, 0);

   return (
      <div id="landing-page">
         <h1 id="slogan">Welcome to the Tower Grove Farmers Market!<br /> We're <em>farmers, purveyors,</em> and <em>eaters</em> of locally grown food.</h1>
         <Link to="/browse">
            <button className="browseshops">Browse Shops</button>
         </Link>
         <h2>About the Market:</h2>
         <div id="instructions">
            <div className="intro-cards">
               <img className="intro-photos" src="images/yoga.png"></img>
               <h5>Free Yoga in the Park</h5>
               <p>Join Kim Winn Yoga for relaxing, restorative, all levels yoga class every Saturday at 9:30 am. Classes are drop-in, pay-what-you-can, with all social-distancing precautions encouraged. This class is for everyone, so don't be shy. All are welcome!</p>
            </div>
            <div className="intro-cards">
               <img className="intro-photos" src="images/history.png"></img>
               <h5>History</h5>
               <p>The Tower Grove Farmers’ Market launched in 2006 with a phenomenal amount of community support. Since then that support has only grown and the market has gone from hosting 13 vendors per week in 2006 to over 100 per week in 2024. What started as a way for co-founders Patrick Horine and Jennifer Ryan to give back to the Tower Grove neighborhood they had fallen in love with has turned into a bustling community event and the largest farmers’ market in the St. Louis region.</p>
            </div>
            <div className="intro-cards">
               <img className="intro-photos" src="images/hours.png"></img>
               <h5>Market Hours</h5>
               <p>
                  Open from April 6 - November 2, 2024 (Saturdays Only) <br />
                  Hours: 8:00 am - 12:30 pm <br /> <br />
                  West of Center Cross Drive in the heart of the park at 4256 Magnolia Ave, St. Louis, MO 63110
               </p>
            </div>
         </div>
      </div>
   )
}

export default LandingPage;
