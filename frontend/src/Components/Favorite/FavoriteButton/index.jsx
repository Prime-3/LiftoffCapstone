import React, { useEffect, useState } from "react";
import "./favoriteStyling.css";

export default function FavoriteButton({shopId}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState("")
  const [favorites, setFavorites] = useState("");
  
  const checkFavorites = () => {
   console.log("ooooooooooo", favorites.length)
    for (const shop of favorites) {
      console.log("WEEEEEEEEE", shop.id, shodId)
      if(shop.id === shopId){
        setIsFavorite(true)
      }
    }
    // favorites.forEach((shop) => {
    //   console.log("WEEEEEEEEE")
    //   if(shop.id === shopId){
    //     setIsFavorite(true)
    //   }
    //   console.log("Check this out!!!!", shop.id, shopId)

    // })
  
  }
    
    
//get user info
  useEffect(() => {
    fetch("/pingauth")
    .then((resp) => {
      if (resp.ok) 
      {
        return resp.json();
      }
      else 
      {
        return null;
      }
    })
    .then((data) => {
      return data.userId
    })
    //get user list of favorites
  .then((userId) => {
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
    
   }, [])
  }
//handles button click to add or delete
const handleFavoriteButton = () => {
  const isInFavorites = checkIfInFavorites(shopId);
  setIsFavorite(isInFavorites);

  setIsFavorite(!isFavorite);
  console.log("HIT handlesubmit")

  if(isFavorite) {
      //remove from favorites
      fetch(`/api/favorites/remove`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: userId,
              shopId: shopId, 
                  
          }),
      })
      .then((resp) => {
          console.log(resp);
      })
  }else {
      //add to favorites
      fetch(`/api/favorites/add`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: userId,
              shopId: shopId,
          }),
      })
      .then((resp) => {
          console.log(resp);
      }) 
    }

  



  return (
    <button
      className="favorite-button"
      onClick={handleFavoriteButton}
      aria-label="favorite"
    >
      {isFavorite ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
    </button>
  );

  async function checkIfInFavorites(shopId){
    const response = await fetch(`/api/favorites/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }, 
    })
    .then((resp) => {
      return resp.json()
    })

    if (response.ok) {
      const data = await response.json();
      return data.isFavorite;
    } 
  }

}