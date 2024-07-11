import React, { useState } from "react";
import FavoriteButton from "./FavoriteButton"; 

const Favorited = () => {
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState();
    const allVendors = []; //TODO: Need to fetch all vendors here

    fetch('/vendors', {method:'GET'})
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
    })
    .then((data) => {
        setFavorites(data);
    })
    fetch('/pingauth', {method:'GET'})
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    }).then((data) => {
        console.log(data)
        setUserId(data.id)
    })

    //need fetch get


const handleFavoriteButton = (shopId) => {
    // update vendor status in favorites list
    let updatedFavorites;

    //already favorited so user is trying to remove from favorites
    if(favorites.includes(shopIdId)){
        updatedFavorites = favorites.filter((id) => id !== shopId)
    }else {
        //user is trying to add to favorites
        updatedFavorites = [...favorites, shopId]
    }

    setFavorites(updatedFavorites);
}

// Filter and find only favorited vendors
const favoritedVendors = allVendors.filter((vendor) => vendor.isFavorite);     //TODO: Need to add isFavorite to sql

  return (
    <div>
        //* map over each favorited vendor and display them 
        {favoritedVendors.map((shopId, vendor) => (        
            <div key = {shopId}>
                <div>{vendor.ShopName}</div>
                <div>{vendor.Description}</div>
            </div>
            ))};      
      <FavoriteButton onClick={handleFavoriteButton(shopId)} />
    </div>
  );
};

export default Favorited;