import Header from "../Components/Header";
import ReviewCard from "../Components/ReviewCard";
import CreateReview from "../Components/CreateReview";
import { useState, useEffect } from "react";

export default function Root() {

    return (
        <>
            <Header />
            <CreateReview />
            <ReviewCard />
        </>
    )
}
