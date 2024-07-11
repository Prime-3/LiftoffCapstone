import { useEffect, useState } from "react";
import SearchCard from "../SearchCard"
import "./BrowsePage.css"

const BrowsePage = () => {
   const [shops, setShops] = useState([])
   useEffect(() => {
      fetch("/api/shops")
         .then((resp) => {
            return resp.json();
         })
         .then((data) => {
            console.log(data)
            setShops(data);
         });
   }, []);

   return (
      <div id="browse-page">
         <h1>BrowsePage</h1>
         <div id="card-container">
            {shops.map((shop) => <SearchCard shop={shop} />)}
         </div>
      </div>
   )
}

export default BrowsePage;
