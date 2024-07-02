import React, { useState, useEffect, useRef } from "react";

const MenuButton = () => {
   const [showMenu, setShowMenu] = useState(false);
   const ulRef = useRef();


   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu]);

   const closeMenu = () => setShowMenu(false);

   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

   return <>
      <button className="profile-button" onClick={openMenu}>
         <p>Login</p>
         <i className="fa-solid fa-bars fa-lg" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
         <li className="menu-item">
            Login
         </li>
         <li className="menu-item">
            Register
         </li>
      </ul>
   </>
}
export default MenuButton;
