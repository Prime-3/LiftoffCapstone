import { useState } from "react";
import "./CreateReview.css"

function CreateReview() {
   const [stars, setStars] = useState(0)
   const [hover, setHover] = useState(0)

   return (
      <form className="form-create-review">
         <label className="review-label">Review Title</label>
         <div id="form-title-stars">
            <input id="form-review-title" type="text"></input>
            <div id="star-container">
               <div className="stars">
                  <i
                     className={(stars >= 1 || hover >= 1) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(1)}
                     onMouseOver={(e) => setHover(1)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 2 || hover >= 2) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(2)}
                     onMouseOver={(e) => setHover(2)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 3 || hover >= 3) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(3)}
                     onMouseOver={(e) => setHover(3)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 4 || hover >= 4) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(4)}
                     onMouseOver={(e) => setHover(4)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 5 || hover >= 5) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(5)}
                     onMouseOver={(e) => setHover(5)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
               </div>
               <span>stars</span>
            </div>
         </div>
         <label className="review-label">Comment</label>
         <textarea id="form-review-comment"></textarea>
         <button className="submit-button" type="submit">Submit</button>
      </form>
   )
}

export default CreateReview;
