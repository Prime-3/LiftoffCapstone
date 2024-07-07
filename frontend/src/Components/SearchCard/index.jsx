import "./SearchCard.css"

function SearchCard() {
   return (
      <div className="search-card">
         <img id="vendor-photo" src="images/dummy-image-square.png" />
         <div>
            <h5 id="vendor-title">VendorTitle</h5>
            <span id="vendor-category">Category</span>
         </div>

      </div>
   )
}

export default SearchCard;
