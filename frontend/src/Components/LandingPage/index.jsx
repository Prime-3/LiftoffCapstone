import "./LandingPage.css"

const LandingPage = () => {
   return (
      <div id="landing-page">
         <h1 id="slogan">This is the Landing Page. Something short about the app. Numquam iste, nobis deleniti alias asperiores saepe nisi fuga sit.</h1>
         <button className="submit-button">Browse Shops</button>
         <h2>How to use:</h2>
         <div id="instructions">
            <div className="intro-cards">
               <img className="intro-photos" src="images/dummy-image-square.png"></img>
               <h5>Subheading</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam iste, nobis deleniti alias asperiores saepe nisi fuga sit, fugit magnam assumenda, et natus adipisci? Aperiam quam quod eos nihil tenetur.</p>
            </div>
            <div className="intro-cards">
               <img className="intro-photos" src="images/dummy-image-square.png"></img>
               <h5>Subheading</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam iste, nobis deleniti alias asperiores saepe nisi fuga sit, fugit magnam assumenda, et natus adipisci? Aperiam quam quod eos nihil tenetur.</p>
            </div>
            <div className="intro-cards">
               <img className="intro-photos" src="images/dummy-image-square.png"></img>
               <h5>Subheading</h5>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam iste, nobis deleniti alias asperiores saepe nisi fuga sit, fugit magnam assumenda, et natus adipisci? Aperiam quam quod eos nihil tenetur.</p>
            </div>
         </div>
      </div>
   )
}

export default LandingPage;
