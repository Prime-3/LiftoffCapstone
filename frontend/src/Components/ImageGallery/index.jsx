import { useEffect, useRef, useState } from "react";
import "./ImageGallery.scss"


const ImageGallery = () => {
   const [initialized, setInitialized] = useState(false)

   const testImages = [
      "https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2021/08/farmers-market-produce-0812211.jpg",
      "https://www.a2gov.org/departments/Parks-Recreation/parks-places/farmers-market/PublishingImages/Pages/default/market%20sign%20flowers.jpg?RenditionId=18",
      "https://media.ksdk.com/assets/KSDK/images/2bc65bd9-9f20-421d-93ec-cced21c205b7/2bc65bd9-9f20-421d-93ec-cced21c205b7_1920x1080.jpg",
      "https://www.sftravel.com/sites/default/files/styles/hero/public/2022-11/farmers-market-tomatoes.jpg.webp?itok=camAgJHT",
      "https://thepaleodiet.com/wp-content/uploads/2023/05/woman-selling-produce-at-farmers-market.jpg",
      "https://friscofreshmarket.com/wp-content/uploads/2022/09/fall-farmers-market-scaled.jpeg",
      "https://www.aldenestatesofjefferson.com/wp-content/uploads/sites/63/2019/08/GettyImages-671270196-1-600x511.jpg",
      "https://www.socosy.co.uk/wp-content/uploads/2020/07/farmers-market.webp",
      "https://img1.wsimg.com/isteam/stock/26336/:/rs=w:1280",
   ]

   useEffect((e) => {
      console.log("useEffect HIT")
      // document.addEventListener("load", function () {
      let carousel = document.querySelector(".carousel");
      let items = carousel.querySelectorAll(".item");
      let dotsContainer = document.querySelector(".dots");

      // if (!initialized) {
      // Insert dots into the DOM
      //    items.forEach((index) => {
      //       let dot = document.createElement("span");
      //       dot.classList.add("dot");
      //       if (index === 0) dot.classList.add("active");
      //       dot.dataset.index = index;
      //       dotsContainer.appendChild(dot);
      //    });
      //    setInitialized(true)
      // }
      // let dots = document.querySelectorAll(".dot");

      // Function to show a specific item
      function showItem(index) {
         items.forEach((item, idx) => {
            item.classList.remove("active");
            // dots[idx].classList.remove("active");
            if (idx === index) {
               item.classList.add("active");
               // dots[idx].classList.add("active");
            }
         });
      }

      // Event listeners for buttons
      document.querySelector(".prev").addEventListener("click", () => {
         let index = [...items].findIndex((item) =>
            item.classList.contains("active")
         );
         showItem((index - 1 + items.length) % items.length);
      });

      document.querySelector(".next").addEventListener("click", () => {
         let index = [...items].findIndex((item) =>
            item.classList.contains("active")
         );
         showItem((index + 1) % items.length);
      });

      // Event listeners for dots
      // dots.forEach((dot) => {
      //    dot.addEventListener("click", () => {
      //       let index = parseInt(dot.dataset.index);
      //       showItem(index);
      //    });
      // });
   }, [])

   return (
      <main class="carousel-container">
         <div class="carousel">
            <div class="item active">
               <img src={testImages[0]} />
            </div>
            {testImages.slice(1).map((img) => (
               <div class="item">
                  <img src={img} />
               </div>
            ))}
         </div>
         <button class="btn prev">Prev</button>
         <button class="btn next">Next</button>
      </main>
   )
}

export default ImageGallery;
