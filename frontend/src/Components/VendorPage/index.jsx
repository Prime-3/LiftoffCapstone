import React from "react";
import FavoriteButton from "../Favorite/FavoriteButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styling.css';
import EditComponent from "../EditButton/EditComponent";



//Filter through all vendors to find the requested vendor with vendorId
const VendorDetailsPage = () => {
    let { vendorId } = useParams();
    const [selectedVendor, setSelectedVendor] = useState({});
    useEffect(() => {
        fetch(`/api/shops/${vendorId}`)
            .then((resp) => {
                return resp.json();
            }
            )
            .then((data) => {
                console.log(data);
                setSelectedVendor(data);
            })
    }, []);

    return (
        <div id="vendor-page">
            <div class="logo"><img src={selectedVendor.logo} />
                <div class="favoriteButton-position"><h2>{selectedVendor.shopName} <FavoriteButton /></h2></div>
                <div class="website"><p>Link to Vendor's Website: <a href={selectedVendor.website}>{selectedVendor.shopName}</a></p></div>
                <div class="description"><h4>{selectedVendor.description}</h4> <EditComponent onClick={EditComponent} /></div>
            </div>

            <div class="schedule">{/*Schedule*/}</div>
            <div class="reviews">{/*Reviews*/}</div>
        </div>
    );
};

export default VendorDetailsPage;
