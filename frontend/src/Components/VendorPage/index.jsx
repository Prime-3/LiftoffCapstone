import React from "react";
import FavoriteButton from "../Favorite/FavoriteButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styling.css';
import EditComponent from "../EditButton/EditComponent";
import CreateReview from "../CreateReview"
import ReviewCard from "../ReviewCard"



//Filter through all vendors to find the requested vendor with vendorId
const VendorDetailsPage = () => {
    let { vendorId } = useParams();
    const [selectedVendor, setSelectedVendor] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`/api/shops/${vendorId}`)
            .then((resp) => {
                return resp.json();
            }
            )
            .then((data) => {
                console.log(data);
                setSelectedVendor(data);
            }).then(() => {
                fetch(`/api/reviews/shop/${vendorId}`)
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((data) => {
                        console.log("review fetch", data);
                        setReviews(data)
                    })

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
            <div class="create-review"><CreateReview shop={selectedVendor} /></div>
            {reviews.map((r) => <div class="reviews"><ReviewCard review={r} /></div>)}
        </div>
    );
};

export default VendorDetailsPage;
