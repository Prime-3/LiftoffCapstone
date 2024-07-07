import Header from "../Components/Header"
import { useState, useEffect } from "react";
import SearchCard from "../Components/SearchCard";

export default function Root() {

    return (
        <>
            <Header />
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
            </div>
        </>
    )
}
