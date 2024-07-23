import { useEffect, useState, useRef } from "react";
import "./ImageGallery.scss"


const ImageGallery = ({ shop, user }) => {
   const testImages = [
      "https://mediaproxy.salon.com/width/1200/https://media2.salon.com/2021/08/farmers-market-produce-0812211.jpg",
      "https://i.pinimg.com/originals/25/1f/3f/251f3f20008259d2f27a97b31246b02a.jpg",
      "https://barbheise.com/wp-content/uploads/2021/06/Tower-grove-market-21-1536x687.jpg",
      "https://images.squarespace-cdn.com/content/v1/5df2b9a23b45611b9a4847d6/ea07a8da-9564-4e74-a3bb-b98836e5a355/Display2.jpg",
      "https://thepaleodiet.com/wp-content/uploads/2023/05/woman-selling-produce-at-farmers-market.jpg",
      "https://everettfarmersmarket.com/wp-content/uploads/2020/08/20200809_123637.jpg",
      "https://www.aldenestatesofjefferson.com/wp-content/uploads/sites/63/2019/08/GettyImages-671270196-1-600x511.jpg",
      "https://i.pinimg.com/originals/59/89/a8/5989a885ca454e5ac0d3e943499c297f.jpg",
      "https://img1.wsimg.com/isteam/stock/26336/:/rs=w:1280",
      "https://www.castlepinesconnection.com/wp-content/uploads/2022/04/farmers_marketsjpg-1-768x387.jpg"
   ]

   const init = useRef(false)
   const [isUploading, setIsUploading] = useState(false)


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
      <>
         <main className="carousel-container">

            <div className="carousel">
               <div className="item active">
                  <img src={testImages.shift()} />
                  <p className="caption">Tower Grove Farmers Market</p>
               </div>
               {
                  testImages.map((img, idx) => (
                     <div className="item">
                        <img src={img} />
                        {/* <p className="caption">Optional Caption {idx + 1}</p> */}
                        <p className="caption">Tower Grove Farmers Market</p>
                     </div>
                  ))
               }
            </div>
            <button className="btn prev"><i class="fa-solid fa-chevron-left"></i></button>
            <button className="btn next"><i class="fa-solid fa-chevron-right"></i></button>
            <div class="dots"></div>
         </main>
      </>
   )
}

export default ImageGallery;
