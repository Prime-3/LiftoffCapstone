import React from "react";
import FavoriteButton from "../Favorite/FavoriteButton";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './styling.css';
import EditComponent from "../EditButton/EditComponent";
import CreateReview from "../CreateReview"
import ReviewCard from "../ReviewCard"
import ImageGallery from "../ImageGallery";
import UploadImage from "../ImageGallery/UploadImage";




//Filter through all vendors to find the requested vendor with vendorId
const VendorDetailsPage = () => {
    let { vendorId } = useParams();
    const [selectedVendor, setSelectedVendor] = useState({});
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState("");
    const [isReviewing, setIsReviewing] = useState(false)

    const handleOpenReviewForm = () => setIsReviewing(!isReviewing)


    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`/api/shops/${vendorId}`)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                // console.log("selected vendor: ", data);
                setSelectedVendor(data);
            }).then(() => {
                fetch(`/api/reviews/shop/${vendorId}`)
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((data) => {
                        // console.log("review fetch", data);
                        setReviews(data)
                    })
            })
        fetch("/pingauth")
            .then((resp) => {
                if (resp.ok) {

                    return resp.json();
                } else {
                    return null
                }
            })
            .then((data) => {
                if (data != null) {
                    // console.log(data);
                    setUser(data)
                }
            })
    }, [])


    return (
        <div id="vendor-page" >
            <div id="top-half">
                <div className="top-left">
                    <Link to={-1} className="back">Back</Link>
                    <img src={selectedVendor.logo} className="logo" />
                </div>
                <div className="top-right">
                    <h2 className="shopName">{selectedVendor.shopName} <FavoriteButton shopId={vendorId} /></h2>
                    <div className="avg-stars">
                        <i
                            className={(selectedVendor.avgStars >= 1) ? "fa-solid fa-star" : "fa-regular fa-star"}
                        ></i>
                        <i
                            className={(selectedVendor.avgStars >= 2) ? "fa-solid fa-star" : "fa-regular fa-star"}
                        ></i>
                        <i
                            className={(selectedVendor.avgStars >= 3) ? "fa-solid fa-star" : "fa-regular fa-star"}
                        ></i>
                        <i
                            className={(selectedVendor.avgStars >= 4) ? "fa-solid fa-star" : "fa-regular fa-star"}
                        ></i>
                        <i
                            className={(selectedVendor.avgStars >= 5) ? "fa-solid fa-star" : "fa-regular fa-star"}
                        ></i>
                    </div>
                    <p className="website">Link to Vendor's Website: <a href={selectedVendor.website} id="a-link" target="_blank">{selectedVendor.shopName}</a></p>
                    <h4 className="description">{selectedVendor.description}<EditComponent onClick={EditComponent} /></h4>
                </div>
            </div>
            <UploadImage shop={selectedVendor} />
            <div className="Photos"><ImageGallery shop={selectedVendor} user={user} /></div>
            <div id="review-form-popup">
                {isReviewing ?
                    (
                        <>
                            <span onClick={handleOpenReviewForm}>Close</span>
                            <div class="create-review"><CreateReview shop={selectedVendor} /></div>
                        </>
                    )
                    :
                    (
                        <span onClick={handleOpenReviewForm}>Add a Review</span>
                    )}
            </div>
            {reviews.length == 0 ? <h3 id="alt-msg">This shop has no reviews, yet...</h3> : ""}
            {reviews.map((r) => <div className="reviews"><ReviewCard review={r} user={user} /></div>)}
        </div>
    );
};

export default VendorDetailsPage;
