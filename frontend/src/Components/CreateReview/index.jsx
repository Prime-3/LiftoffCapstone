import { useState } from "react";
import "./CreateReview.css"

function CreateReview({ shop }) {
   const [stars, setStars] = useState(0)
   const [title, setTitle] = useState("")
   const [comment, setComment] = useState("")
   const [hover, setHover] = useState(0)
   const [isReviewing, setIsReviewing] = useState(false)

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "comment") setComment(value);
      if (name === "title") setTitle(value);
   };

   const handleSubmit = (e) => {
      e.preventDefault()

      fetch("/pingauth")
         .then((resp) => {
            return resp.json();
         })
         .then((data) => {
            return data.userId
         }).then((userId) => {
            fetch("/api/reviews", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  applicationUserId: userId,
                  shopId: shop.id,
                  title: title,
                  stars: stars,
                  description: comment
               })
            })
            document.location.href = `/vendorpage/${shop.id}`;
         })
   }

   const handleOpenReviewForm = () => setIsReviewing(!isReviewing)

   return (
      <div>
         {isReviewing ?
            (
               <p onClick={handleOpenReviewForm}>Add a review</p>
            )
            :
            (
               <form className="form-create-review">
                  <label className="review-label">Review Title</label>
                  <div id="form-title-stars">
                     <input id="form-review-title" type="text" name="title" onChange={handleChange}></input>
                     <div id="star-container">
                        <div className="stars">
                           <i
                              className={(stars >= 1 || hover >= 1) ? "fa-solid fa-star" : "fa-regular fa-star"}
                              onClick={() => setStars(1)}
                              onMouseOver={() => setHover(1)}
                              onMouseLeave={() => setHover(0)}
                           ></i>
                           <i
                              className={(stars >= 2 || hover >= 2) ? "fa-solid fa-star" : "fa-regular fa-star"}
                              onClick={() => setStars(2)}
                              onMouseOver={() => setHover(2)}
                              onMouseLeave={() => setHover(0)}
                           ></i>
                           <i
                              className={(stars >= 3 || hover >= 3) ? "fa-solid fa-star" : "fa-regular fa-star"}
                              onClick={() => setStars(3)}
                              onMouseOver={() => setHover(3)}
                              onMouseLeave={() => setHover(0)}
                           ></i>
                           <i
                              className={(stars >= 4 || hover >= 4) ? "fa-solid fa-star" : "fa-regular fa-star"}
                              onClick={() => setStars(4)}
                              onMouseOver={() => setHover(4)}
                              onMouseLeave={() => setHover(0)}
                           ></i>
                           <i
                              className={(stars >= 5 || hover >= 5) ? "fa-solid fa-star" : "fa-regular fa-star"}
                              onClick={() => setStars(5)}
                              onMouseOver={() => setHover(5)}
                              onMouseLeave={() => setHover(0)}
                           ></i>
                        </div>
                        <span>stars</span>
                     </div>
                  </div>
                  <label className="review-label">Comment</label>
                  <textarea id="form-review-comment" name="comment" onChange={handleChange}></textarea>
                  <button className="submit-button" type="submit" onClick={handleSubmit}>Submit</button>
                  <p onClick={handleOpenReviewForm}>Close Review Form</p>
               </form>
            )}
      </div>
   )
}

export default CreateReview;
