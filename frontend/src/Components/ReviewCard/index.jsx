import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ReviewCard.css"

function ReviewCard({ review, user }) {
   const navigate = useNavigate()
   let reviewTitle = review.title
   let stars = review.stars
   let reviewedBy = review.reviewerName
   let reviewComment = review.description
   let userId = review.applicationUserId

   const handleClick = () => {
      fetch(`/api/reviews/${review.id}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
         }
      })
         .then((resp) => {
            if (resp.ok) {
               return resp.json()
            } else {
               return null;
            }
         })
         .then((data) => {
            if (data != null) {
               console.log(data);
            }
         })
      navigate(0)
   }

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
            {(userId == user.userId) ? <span onClick={handleClick} className="deleteButton">Delete</span> : ""}
         </div>
         <h5 id="reviewed-by">Review by {reviewedBy}</h5>
         <p id="review-comment">{reviewComment}</p>
      </div>
   )
}

export default ReviewCard;
