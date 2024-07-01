import "./HeaderStyle.css"

const Header = () => {
   return (
      <>
         <header>
            <img id="logo" src="images/STLmarkets.png" />
            <form>
               <input type="text"></input>
               <button>Go</button>
            </form>
            <button>Profile</button>
         </header>
      </>
   )
}

export default Header;