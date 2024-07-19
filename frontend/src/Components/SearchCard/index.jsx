import "./SearchCard.css"
import { Link } from "react-router-dom";

function SearchCard({ shop }) {
   let vendorPhoto = (shop.logo ? shop.logo : "/images/dummy-image-square.png");
   let vendorName = shop.shopName;
   let vendorCategory = shop.category;
   let stars = shop.avgStars;

   return (
      <div className="search-card">
         <Link to={`/vendorpage/${shop.id}`} id="shop-link">
            <div className="searchPhotos"><img id="vendor-photo" src={vendorPhoto} /></div>
            <div id="vendor-info">
               <div>
                  <h3 id="vendor-title">{vendorName}</h3>
                  <span id="vendor-category">{vendorCategory}</span>
               </div>
               <div className="stars">
                  {(stars == 0) ?
                     (
                        <span>New!</span>
                     )
                     :
                     (
                        <>
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
                        </>
                     )}
               </div>
            </div>
         </Link>
      </div>
   )
}

export default SearchCard;
