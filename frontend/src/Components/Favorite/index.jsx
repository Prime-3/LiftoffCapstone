import React, { useState, useEffect } from "react";
import FavoriteButton from "./FavoriteButton"; 
import { useParams } from "react-router-dom";

const Favorited = () => {
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState("");
    // let { userId } = useParams();

  // get userId
//   useEffect(() => {
//     fetch("/pingauth")
//     .then((resp) => {
//       if (resp.ok) {
//         return resp.json();
//       }
//       else {
//         return null;
//       }
//     })
//     .then((data) => {
//         setUserId(data.userId);
//         console.log(`My userid : ${data.userId}`);
//         console.log(data);
//     })
//   }, []);

  //fetch user favorites list
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
        // setUserId(data.userId);
        // console.log(`My userid : ${data.userId}`);
        // console.log(data);
        return data.userId
    })
    // console.log(`my user id : '${userId}'`)
    // console.log(typeof userId);
    // if (userId =="") {
    //     setFavorites([]);
    //     return () => {};
    // }
    // const url = `/api/favorites/${userId}`;
    // console.log(`my url: ${url}`);
    .then((userId) => {
        console.log("User id: ", userId)
        fetch(`/api/favorites/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }, 
        })
        .then((resp) => {
            console.log(resp);
            // if (resp.ok) {
            //     console.log("ok!");
            //     return resp.json();
            // }
            // return [];
            // console.log(data)
            // setFavorites(data)
            return resp.json()
        })
        .then((data) => {
            console.log("Favorites date: ", data)
            setFavorites(data);
            console.log(favorites);
      })

    })
}, []);



//click to add or remove
const handleFavoriteButton = (vendorId) => {
    console.log("HIT handlesubmit")
    const isFavorited = favorites.includes(vendorId)

    if(isFavorited) {
        //remove from favorites
        fetch(`/api/favorites/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId, 
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
            }),
        })
        .then((resp) => {
            console.log(resp);
        })
    }
    
    
}
  return (
    <div>
        <h1>TEST</h1>
        {/* map over each favorited vendor and display them  */}
        {favorites.map((vendor) => (        
            <div key = {vendor.ShopId}>
                <div>{vendor.ShopName}</div>
                <div>{vendor.Description}</div>
            </div>
            ))};      
      <FavoriteButton onClick={(vendorId) => handleFavoriteButton(vendorId)} />
    </div>
  );
}

export default Favorited;