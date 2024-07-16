import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';

import LoginFormModal from "../LoginFormModal";
import RegisterFormModal from "../RegisterFormModal";
import "./MenuStyle.css"
import LogoutLink from "../LogoutLink";

const MenuButton = () => {
   const [showMenu, setShowMenu] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [modalSel, setModalSel] = useState();
   const [user, setUser] = useState()


   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   const closeMenu = () => setShowMenu(false);

   useEffect(() => {
      fetch("/pingauth")
         .then((resp) => {
            if (resp.ok) {

               return resp.json();
            } else {
               return null
            }
         })
         .then((data) => {
            console.log(data);
            setUser(data)
         })

   }, []);


   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

   return <>
      <button className="profile-button" onClick={showMenu ? closeMenu : openMenu}>
         <p>Menu</p>
         <i className="fa-solid fa-bars fa-lg" />
      </button>
      <ul className={ulClassName} id="menu-items-container">
         {user ?
            (
               <>
                  <li className="menu-item">
                     <h3>Account</h3>
                  </li>
                  <li className="menu-item">
                     <h3 onClick={() => document.location.href = "/favorites"}>Favorites</h3>
                  </li>
                  <li className="menu-item">
                     <h3>Shops</h3>
                  </li>
                  <li className="menu-item">
                     <LogoutLink>
                        <h3 onClick={closeMenu}>Logout</h3>
                     </LogoutLink>
                  </li>
               </>
            )
            :
            (
               <>
                  <li className="menu-item">
                     <h3 onClick={() => {
                        closeMenu()
                        setModalSel("login");
                        setShowModal(true)
                     }}>
                        Login
                     </h3>
                     {(showModal && modalSel == "login") && createPortal(
                        <LoginFormModal onClose={() => setShowModal(false)} />,
                        document.body
                     )}
                  </li>
                  <li className="menu-item">
                     <h3 onClick={() => {
                        closeMenu()
                        setModalSel("register");
                        setShowModal(true)
                     }}>
                        Register
                     </h3>
                     {(showModal && modalSel == "register") && createPortal(
                        <RegisterFormModal onClose={() => setShowModal(false)} />,
                        document.body
                     )}
                  </li>
               </>
            )
         }
      </ul>
   </>
}
export default MenuButton;
