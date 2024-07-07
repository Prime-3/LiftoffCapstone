import "./ReviewCard.css"

function ReviewCard() {
   let stars = 3;

   return (
      <div className="review-card">
         <div>
            <h4>Review</h4>
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
         <h5>Review by UserName</h5>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem optio enim delectus et fugiat unde animi laudantium quos esse. Ex amet illo suscipit maiores at magnam fugiat temporibus impedit adipisci!</p>
      </div>
   )
}

export default ReviewCard;
