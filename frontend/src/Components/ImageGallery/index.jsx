import { useEffect, useState, useRef } from "react";
import "./ImageGallery.scss"


const ImageGallery = () => {
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
      "https://www.castlepinesconnection.com/wp-content/uploads/2022/04/farmers_marketsjpg-1-768x387.jpg"
   ]

   const init = useRef(false)

   useEffect(() => {
      if (!init.current) {
         init.current = true

         let carousel = (document.querySelector(".carousel"));
         let items = (carousel.querySelectorAll(".item"));
         let dotsContainer = document.querySelector(".dots");

         items.forEach((_, index) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
         });

         let dots = document.querySelectorAll(".dot");

         function showItem(index) {
            items.forEach((item, idx) => {
               item.classList.remove("active");
               dots[idx].classList.remove("active");
               if (idx === index) {
                  item.classList.add("active");
                  dots[idx].classList.add("active");
               }
            });
         }

         document.querySelector(".prev").addEventListener("click", () => {
            let index = [...items].findIndex((item) =>
               item.classList.contains("active")
            );
            showItem((index == 0 ? items.length - 1 : index - 1));
         });

         document.querySelector(".next").addEventListener("click", () => {
            let index = [...items].findIndex((item) =>
               item.classList.contains("active")
            );
            showItem((index >= items.length - 1 ? 0 : index + 1));
         });

         dots.forEach((dot) => {
            dot.addEventListener("click", () => {
               let index = parseInt(dot.dataset.index);
               showItem(index);
            })
         })
      }
   }, [])

   return (
      <main className="carousel-container">
         <div className="carousel">
            <div className="item active">
               <img src={testImages.shift()} />
            </div>
            {
               testImages.map((img) => (
                  <div className="item">
                     <img src={img} />
                  </div>
               ))
            }
         </div>
         <button className="btn prev"><i class="fa-solid fa-chevron-left"></i></button>
         <button className="btn next"><i class="fa-solid fa-chevron-right"></i></button>
         <div class="dots"></div>
      </main>
   )
}

export default ImageGallery;
