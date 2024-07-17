import React, { useEffect, useState } from "react";
import "./favoriteStyling.css";

function FavoriteButton({ shopId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState("")
  const [favorites, setFavorites] = useState("");

  const checkFavorites = async () => {
    console.log("ooooooooooo", favorites.length)
    for (const shop of favorites) {
      console.log("WEEEEEEEEE", shop.id, shodId)
      if (shop.id === shopId) {
        setIsFavorite(true)
      }
    }
  }


  //get user info
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
        setUserId(data.userId)
        return data.userId
      })
      .then((userId) => {
        fetch("/api/favorites/check", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            shopId: shopId
          })
        })
          .then((resp) => {
            return resp.json()
          })
          .then((data) => {
            console.log("CHECK: ", data)
            if (data.length > 0) {
              setIsFavorite(true)
            } else {
              setIsFavorite(false)
            }
          })
      })
    //get user list of favorites

    // checkFavorites
  }, [])

  //handles button click to add or delete
  const handleFavoriteButton = () => {
    // setIsFavorite(isInFavorites);

    // setIsFavorite(!isFavorite);
    console.log("HIT handlesubmit")

    if (isFavorite) {
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
          setIsFavorite(false)
          console.log(resp);
        })
    } else {
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
          setIsFavorite(true)
          console.log(resp);
        })
    }
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
}

export default FavoriteButton;
