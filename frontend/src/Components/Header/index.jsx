import "./HeaderStyle.css"
import ProfileButton from "./ProfileButton";

const Header = () => {
   return (
      <>
         <header>
            <img id="logo" src="images/STLmarkets.png" />
            <form>
               <input type="text"></input>
               <button>Go</button>
            </form>
            <ProfileButton />
         </header>
      </>
   )
}

export default Header;
