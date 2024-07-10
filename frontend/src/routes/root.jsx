
import ReviewCard from "../Components/ReviewCard";
import CreateReview from "../Components/CreateReview";
import Header from "../Components/Header"
import SearchCard from "../Components/SearchCard";
import { useState, useEffect } from "react";
import VendorDetailsPage from "../Components/VendorPage";

export default function Root() {

    return (
        <>
            <Header />
            {/* For testing review cards
            <CreateReview />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard /> */}

            {/* Uncomment to test
            <div id="cards">
                <SearchCard />
                <SearchCard />
                <SearchCard />
                <SearchCard />
            </div>
            <div id="cards">
                <SearchCard />
                <SearchCard />
                <SearchCard />
                <SearchCard />
            </div>
            <div id="cards">
                <SearchCard />
                <SearchCard />
                <SearchCard />
                <SearchCard />
            </div>
            <div id="cards">
                <SearchCard />
                <SearchCard />
                <SearchCard />
                <SearchCard />
            </div> */}
            {/* <VendorDetailsPage /> */}
        </>
    )
}
