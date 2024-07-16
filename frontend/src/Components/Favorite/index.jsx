import React, { useState, useEffect } from "react";
import FavoriteButton from "./FavoriteButton"; 
import { useParams } from "react-router-dom";
import "./favoriteStyles.css" 

const Favorited = () => {
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState("");

  // get userId
  useEffect(() => {
    fetch("/pingauth")
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      else {
        return null;
      }
    })
    .then((data) => {
        return data.userId
    })
    //fetch user favorites list
    .then((userId) => {
        console.log("User id: ", userId)
        fetch(`/api/favorites/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            console.log("Favorites date: ", data)
            setFavorites(data);
            console.log(favorites);
      })

    })
}, []);



// //click to add or remove
// const handleFavoriteButton = (vendorId) => {
//     console.log("HIT handlesubmit")
//     const isFavorited = favorites.includes(vendorId)

//     if(isFavorited) {
//         //remove from favorites
//         fetch(`/api/favorites/remove`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userId: userId, 
//             }),
//         })
//         .then((resp) => {
//             console.log(resp);
//         })
//     }else {
//         //add to favorites
//         fetch(`/api/favorites/add`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userId: userId,
//             }),
//         })
//         .then((resp) => {
//             console.log(resp);
//         })
    // }
    
    
// }
  return (
    <div className="favoriteList">
        <h1 className="title">Favorites List</h1>
        {/* map over each favorited vendor and display them  */}
        {favorites.map((vendor) => (        
            <div className="key" key = {vendor.shopId}>
                <div className="logo"><img className="format" src={vendor.logo} /></div>
                <div>
                <div className="shopname">{vendor.shopName} </div>
                <div className="description">{vendor.description}</div>
                </div>
                {/* <FavoriteButton className= "button" onClick={(vendorId) => handleFavoriteButton(vendorId)} /> */}
            </div>
            ))}  
     
    </div>
  )
}

export default Favorited;