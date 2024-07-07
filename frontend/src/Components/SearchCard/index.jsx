import "./SearchCard.css"

function SearchCard() {
   let vendorPhoto = "images/dummy-image-square.png"
   let vendorName = "Vendor Name"
   let vendorCategory = "Vendor Category"
   let stars = 3;

   return (
      <div className="search-card">
         <a href="/">
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
