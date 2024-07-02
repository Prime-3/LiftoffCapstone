import React, { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

import LoginFormModal from "../LoginFormModal";
import RegisterFormModal from "../RegisterFormModal";

const MenuButton = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalSel, setModalSel] = useState();
   const ulRef = useRef();


   const openMenu = (e) => {
      console.log("HIT", showMenu)
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
            <button onClick={() => {
               closeMenu()
               setModalSel("login");
               setShowModal(true)
            }}>
               Login
            </button>
            {(showModal && modalSel == "login") && createPortal(
               <LoginFormModal onClose={() => setShowModal(false)} />,
               document.body
            )}
         </li>
         <li className="menu-item">
            <button onClick={() => {
               closeMenu()
               setModalSel("register");
               setShowModal(true)
            }}>
               Register
            </button>
            {(showModal && modalSel == "register") && createPortal(
               <RegisterFormModal onClose={() => setShowModal(false)} />,
               document.body
            )}
         </li>
      </ul>
   </>
}
export default MenuButton;
