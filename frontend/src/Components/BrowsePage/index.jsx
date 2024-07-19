import { useLoaderData } from "react-router-dom";
import SearchCard from "../SearchCard"
import "./BrowsePage.css"
import { getShops } from "../../utils/shops.js";

export async function loader({ params }) {
   const shops = await getShops(params.searchTerm);
   return { shops };
}
const BrowsePage = () => {
   const { shops } = useLoaderData();

   return (
      <div id="browse-page">
         <div id="card-container">
            {shops.map((shop) => <SearchCard shop={shop} key={shop.id} />)}
         </div>
      </div>
   )
}

export default BrowsePage;
