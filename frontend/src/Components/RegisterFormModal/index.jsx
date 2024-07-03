import { useState } from "react";
import { redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom"

function RegisterFormModal({ onClose }) {
   const [isVendor, setIsVendor] = useState(false);
   const [formData, setFormData] = useState({})
   // const history = useHistory()

   const handleCheck = () => setIsVendor(!isVendor)

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData)
      fetch("/register", {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
      }).then(result => result.json()).then(
         (result) => {
            console.log(result);
         }
      );

      return redirect("/")
   }

   const handleInputChange = (event) => {
      const { target } = event;
      const { name, value } = target;

      setFormData({
         ...formData,
         [name]: value
      });
   }

   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form">
               <h2 className="form-title">Register Account</h2>
               <label>First Name</label>
               <input type="text" name="FirstName" onChange={handleInputChange} required></input>
               <label>Last Name</label>
               <input type="text" name="LastName" onChange={handleInputChange} required></input>
               <label>Email</label>
               <input type="email" name="Email" onChange={handleInputChange} required></input>
               <label>Password</label>
               <input type="password" name="Password" onChange={handleInputChange} required></input>
               <label>Confirm Password</label>
               <input type="password" required></input>
               <div id="vendor-checkbox-area">
                  <input type="checkbox" id="vendor-checkbox" onClick={handleCheck}></input>
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
               <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      </div>

   );
}

export default RegisterFormModal;
