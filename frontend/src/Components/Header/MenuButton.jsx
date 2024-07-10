import React, { useState, useEffect, useRef } from "react";
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
   const ulRef = useRef();


   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      fetch("/pingauth")
         .then((resp) => {
            return resp.json();
         })
         .then((data) => {
            console.log(data);
            setUser(data)
         })

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
         <p>Menu</p>
         <i className="fa-solid fa-bars fa-lg" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
         {user ?
            (
               <>
                  <li className="menu-item">
                     <h3>Account</h3>
                  </li>
                  <li className="menu-item">
                     <h3>Favorites</h3>
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
