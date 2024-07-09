import React, { useState } from "react";
import FavoriteButton from "./FavoriteButton"; 

const Favorited = () => {
    const [favorites, setFavorites] = useState([]);
    const allVendors = []; //TODO: Need to fetch all vendors here

const handleFavoriteButton = (vendorId) => {
    // update vendor status in favorites list
    let updatedFavorites;

    //already favorited so user is trying to remove from favorites
    if(favorites.includes(vendorId)){
        updatedFavorites = favorites.filter((id) => id !== vendorId)
    }else {
        //user is trying to add to favorites
        updatedFavorites = [...favorites, vendorId]
    }

    setFavorites(updatedFavorites);
}

// Filter and find only favorited vendors
const favoritedVendors = allVendors.filter((vendor) => vendor.isFavorite);     //TODO: Need to add isFavorite to sql

  return (
    <div>
        //* map over each favorited vendor and display them 
        {favoritedVendors.map((vendorId, vendor) => (        
            <div key = {vendorId}>
                <div>{vendor.ShopName}</div>
                <div>{vendor.Description}</div>
            </div>
            ))};      
      <FavoriteButton onClick={handleFavoriteButton(vendorId)} />
    </div>
  );
};

export default Favorited;