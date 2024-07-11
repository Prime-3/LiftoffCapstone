import { useEffect, useState } from "react";
import SearchCard from "../SearchCard"

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
      <>
         <h1>BrowsePage</h1>
         {shops.map((shop) => <SearchCard shop={shop} />)}
      </>
   )
}

export default BrowsePage;
