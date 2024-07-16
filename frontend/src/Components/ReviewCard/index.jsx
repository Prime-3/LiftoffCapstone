import { useEffect, useState } from "react"
import "./ReviewCard.css"

function ReviewCard({ review, user }) {

   let reviewTitle = review.title
   let stars = review.stars
   let reviewedBy = review.reviewerName
   let reviewComment = review.description
   let userId = review.applicationUserId


   return (
      <div className="review-card">
         <div id="title-stars">
            <h3>{reviewTitle}</h3>
            <div className="stars">
               <i
                  className={(stars >= 1) ? "fa-solid fa-star" : "hidden"}
               ></i>
               <i
                  className={(stars >= 2) ? "fa-solid fa-star" : "hidden"}
               ></i>
               <i
                  className={(stars >= 3) ? "fa-solid fa-star" : "hidden"}
               ></i>
               <i
                  className={(stars >= 4) ? "fa-solid fa-star" : "hidden"}
               ></i>
               <i
                  className={(stars >= 5) ? "fa-solid fa-star" : "hidden"}
               ></i>
            </div>
            {(userId == user.userId) ? <span>Delete</span> : ""}
         </div>
         <h5 id="reviewed-by">Review by {reviewedBy}</h5>
         <p id="review-comment">{reviewComment}</p>
      </div>
   )
}

export default ReviewCard;
