import { useNavigate, Link } from "react-router-dom";
import "./HeaderStyle.css"
import MenuButton from "./MenuButton";

const Header = () => {
   const navigate = useNavigate();
   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const searchTerm = formData.get("search-term");
      navigate(`/browse/${searchTerm}`);
   }
   return (
      <>
         <header>
            <Link to="/">
               <img id="logo" src="/images/STLmarkets.png" />
            </Link>
            <form onSubmit={handleSubmit}>
               <input id="search-bar" type="search" name="search-term"></input>
               <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div id="profile-button">
               <MenuButton />
            </div>
         </header>
      </>
   )
}

export default Header;
