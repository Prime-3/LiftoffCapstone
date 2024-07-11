import "./SearchCard.css"

function SearchCard({ shop }) {
   let vendorPhoto = "images/dummy-image-square.png"
   let vendorName = shop.shopName
   let vendorCategory = shop.category
   let stars = 3;

   return (
      <div className="search-card">
         <a href={`/shops/${shop.id}`}>
            <img id="vendor-photo" src={vendorPhoto} />
            <div id="vendor-info">
               <div>
                  <h3 id="vendor-title">{vendorName}</h3>
                  <span id="vendor-category">{vendorCategory}</span>
               </div>
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
            </div>
         </a>
      </div>
   )
}

export default SearchCard;
