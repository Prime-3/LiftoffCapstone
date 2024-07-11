import { useState } from "react";
import "./RegisterFormModal.css"


function RegisterFormModal({ onClose }) {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("")
   const [isVendor, setIsVendor] = useState(false);
   const [shopName, setShopName] = useState("");
   const [phoneNum, setPhoneNum] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("")
   const [error, setError] = useState("");
   const [confirmed, setConfirmed] = useState(false)

   const categories = [
      "Food",
      "Clothing",
      "Art",
      "Home Goods",
      "Produce",
      "Other"
   ]

   const handleCheck = () => setIsVendor(!isVendor);

   function passwordCheck() {
      var input = document.getElementById('password-confirm');
      if (input.value == document.getElementById('password').value) {
         console.log("true")
         setConfirmed(true)
         setError("");
      } else {
         console.log("false")
         setConfirmed(false)
         setError('Password Must be Matching.');
      }
      console.log(input.value, document.getElementById('password').value, confirmed)
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "firstName") setFirstName(value);
      if (name === "lastName") setLastName(value);
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "shopName") setShopName(value);
      if (name === "phoneNum") setPhoneNum(value);
      if (name === "category") setCategory(value);
      if (name === "description") setDescription(value);
   };

   const handleSubmit = (e) => {
      e.preventDefault()

      if (confirmed) {

         fetch("/api/acounts/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               firstName: firstName,
               lastName: lastName,
               email: email,
               password: password
            })
         }).then((resp) => {
            console.log("account register", resp)
         }).then(() => {
            if (isVendor) {
               fetch("/pingauth")
                  .then((resp) => {
                     return resp.json();
                  })
                  .then((data) => {
                     return data.userId
                  }).then((userId) => {
                     fetch("/api/shops", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                           shopName: shopName,
                           applicationUserId: userId,
                           phoneNumber: phoneNum,
                           description: description,
                           category: category
                        })
                     }).then(() => {
                        window.location.href = '/';
                     })
                  });
            }
         })

      }
   }

   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <h2 className="form-title">Register Account</h2>
            <form className="login-form">
               <div id="register-form">
                  <div id="account-container">
                     <label>First Name</label>
                     <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        required />
                     <label>Last Name</label>
                     <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        required />
                     <label>Email</label>
                     <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required />
                     <label>Password</label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required />
                     <label>Confirm Password</label>
                     <input
                        type="password"
                        id="password-confirm"
                        onInput={passwordCheck}
                        required />
                     {error && <span className="error">{error}</span>}
                     <div id="vendor-checkbox-area">
                        <input type="checkbox" id="vendor-checkbox" onClick={handleCheck}></input>
                        <label>Are you a vendor?</label>
                     </div>
                  </div>
                  {isVendor && (
                     <div id="shop-container">
                        <label>Shop Name</label>
                        <input
                           type="text"
                           name="shopName"
                           onChange={handleChange}
                           required />
                        <label>Description</label>
                        <textarea
                           name="description"
                           onChange={handleChange}
                           required />
                        <label>Category</label>
                        <select
                           onChange={handleChange}
                           name="category"
                           required>
                           <option value="">Select One</option>
                           {categories.map(c => <option value={c}>{c}</option>)}
                        </select>
                     </div>
                  )}
               </div>
               <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      </div>
   );
}

export default RegisterFormModal;
