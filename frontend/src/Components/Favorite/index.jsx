import React, { useState, useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import { useParams } from "react-router-dom";
import "./favoriteStyles.css"
import VendorDetailsPage from "../VendorPage";
import { Link } from 'react-router-dom';


const Favorited = () => {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div className="favoriteList">
      <h1 className="title">Favorites List</h1>
      {favorites.length == 0 ? <h3 id="no-fav">No Favorites Added</h3> : ""}

      {favorites.map((vendor) => (
        <div className="key" key={vendor.id}>
          {console.log(vendor)}
          <div className="logo"><img className="format" src={vendor.logo} /></div>
          <div>
            <div className="shopname">
              <Link to={`/vendorpage/${vendor.id}`}>{vendor.shopName}</Link>
            </div>
            <div className="description">{vendor.description}</div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Favorited;