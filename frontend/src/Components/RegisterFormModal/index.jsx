import { useState } from "react";

function RegisterFormModal({ onClose }) {
   const [isVendor, setIsVendor] = useState(false);

   const handleClick = () => setIsVendor(!isVendor)

   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form" action="/api/vendors/registration" method="post">
               <h2 className="form-title">Register Account</h2>
               <label>First Name</label>
               <input type="text" required></input>
               <label>Last Name</label>
               <input type="text" required></input>
               <label>Email</label>
               <input type="email" required></input>
               <label>Password</label>
               <input type="password" required></input>
               <label>Confirm Password</label>
               <input type="password" required></input>
               <div id="vendor-checkbox-area">
                  <input type="checkbox" id="vendor-checkbox" onClick={handleClick}></input>
                  <label>Are you a vendor?</label>
               </div>
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
               <button type="submit" className="submit-button">Submit</button>
            </form>
         </div>
      </div>

   );
}

export default RegisterFormModal;
