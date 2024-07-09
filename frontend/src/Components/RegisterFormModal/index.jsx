import { useEffect, useState } from "react";


function RegisterFormModal({ onClose }) {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("")
   const [isVendor, setIsVendor] = useState(false);
   const [shopName, setShopName] = useState("");
   const [phoneNum, setPhoneNum] = useState("");
   const [category, setCategory] = useState("");
   const [ownerId, setOwnerId] = useState(0)



   const categories = [
      "Food",
      "Clothing",
      "Art",
      "Home Goods",
      "Produce",
      "Other"
   ]

   const handleCheck = () => setIsVendor(!isVendor);

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "firstName") setFirstName(value);
      if (name === "lastName") setLastName(value);
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "shopName") setShopName(value);
      if (name === "phoneNum") setPhoneNum(value);
      if (name === "category") setCategory(value);
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      fetch("/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email: email,
            password: password
         })
      }).then((resp) => {
         console.log(resp)
      })

      if (isVendor) {
         fetch("/api/vendors", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               shopName: shopName,
               ownerName: email,
               phoneNumber: phoneNum,
               address: null,
               description: null,
               website: null
            })
         });
      }
   }


   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form" onSubmit={handleSubmit}>
               <h2 className="form-title">Register Account</h2>
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
                  name="password"
                  onChange={handleChange}
                  required />
               <label>Confirm Password</label>
               <input type="password" required></input>
               <div id="vendor-checkbox-area">
                  <input type="checkbox" id="vendor-checkbox" onClick={handleCheck}></input>
                  <label>Are you a vendor?</label>
               </div>
               {isVendor && (
                  <>
                     <label>Shop Name</label>
                     <input
                        type="text"
                        name="shopName"
                        onChange={handleChange}
                        required />
                     <label>Phone #</label>
                     <input
                        type="text"
                        name="phoneNum"
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
                  </>
               )}
               <button type="submit" className="submit-button">Submit</button>
            </form>
         </div>
      </div>

   );
}

export default RegisterFormModal;
