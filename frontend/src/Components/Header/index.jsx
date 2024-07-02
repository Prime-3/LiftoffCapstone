import "./HeaderStyle.css"
import MenuButton from "./MenuButton";

const Header = () => {
   return (
      <>
         <header>
            <a href="/">
               <img id="logo" src="images/STLmarkets.png" />
            </a>
            <form>
               <input type="text"></input>
               <a href="/" id="search-button">
                  <i class="fa-solid fa-magnifying-glass"></i>
               </a>
            </form>
            <MenuButton />
         </header>
      </>
   )
}

export default Header;
