import { useState } from "react";

function RegisterFormModal({ onClose }) {
   const [isVendor, setIsVendor] = useState(false);

   const handleClick = () => setIsVendor(!isVendor)

   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form">
               <h1>Register</h1>
               <label>First Name</label>
               <input type="text" required></input>
               <label>Last Name</label>
               <input type="text" required></input>
               <label>Email</label>
               <input type="email" required></input>
               <lable>Password</lable>
               <input type="password" required></input>
               <lable>Confirm Password</lable>
               <input type="password" required></input>
               <input type="checkbox" onClick={handleClick}></input>
               <span>Vendor</span>
               {isVendor && (
                  <>
                     <label>Vender Name</label>
                     <input type="text" required></input>
                     <label>Phone #</label>
                     <input type="text"></input>
                     <label>Category</label>
                     <select required>
                        <option value="">Select One</option>
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                        <option value="test3">test3</option>
                     </select>
                  </>
               )}
               <button type="submit" >Submit</button>
            </form>
         </div>
      </div>

   );
}

export default RegisterFormModal;
