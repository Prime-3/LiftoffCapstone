import "./ReviewCard.css"

function ReviewCard() {
   // TODO: Add parms to pass review data into card
   let reviewTitle = "This place is awesome!"
   let stars = 3;
   let reviewedBy = "Joe Schmoe"
   let reviewComment = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci!"

   return (
      <div className="review-card">
         <div id="title-stars">
            <h3>{reviewTitle}</h3>
            <div className="stars">
               <i
                  className={(stars >= 1) ? "fa-solid fa-star" : "fa-regular fa-star"}
               ></i>
               <i
                  className={(stars >= 2) ? "fa-solid fa-star" : "fa-regular fa-star"}
               ></i>
               <i
                  className={(stars >= 3) ? "fa-solid fa-star" : "fa-regular fa-star"}
               ></i>
               <i
                  className={(stars >= 4) ? "fa-solid fa-star" : "fa-regular fa-star"}
               ></i>
               <i
                  className={(stars >= 5) ? "fa-solid fa-star" : "fa-regular fa-star"}
               ></i>
            </div>
         </div>
         <h5 id="reviewed-by">Review by {reviewedBy}</h5>
         <p id="review-comment">{reviewComment}</p>
      </div>
   )
}

export default ReviewCard;
