import { useEffect, useRef, useState } from "react";
import "./ImageGallery.scss"


const ImageGallery = () => {
   const [initialized, setInitialized] = useState(false)

   useEffect((e) => {
      if (!initialized) {
         setInitialized(true)
         console.log("useEffect HIT")
         // document.addEventListener("load", function () {
         let carousel = document.querySelector(".carousel");
         let items = carousel.querySelectorAll(".item");
         let dotsContainer = document.querySelector(".dots");

         // Insert dots into the DOM
         items.forEach((index) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
         });

         let dots = document.querySelectorAll(".dot");

         // Function to show a specific item
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
         dots.forEach((dot) => {
            dot.addEventListener("click", () => {
               let index = parseInt(dot.dataset.index);
               showItem(index);
            });
         });
      }
   }, [])

   return (
      <main class="carousel-container">
         <div class="carousel">
            <div class="item active">
               <img src="https://bit.ly/34xczKy" alt="Image 1" />
               <p class="caption">Caption for Image 1</p>
            </div>
            <div class="item">
               <img src="https://bit.ly/3lkp5DW" alt="Image 2" />
               <p class="caption">Caption for Image 2</p>
            </div>
            <div class="item">
               <img src="https://bit.ly/3iMHuI1" alt="Image 3" />
               <p class="caption">Caption for Image 3</p>
            </div>
         </div>
         <button class="btn prev">Prev</button>
         <button class="btn next">Next</button>
         <div class="dots"></div>
      </main>
   )
}

export default ImageGallery;