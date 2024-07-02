
function RegisterFormModal({ onClose }) {
   return (
      <>
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal">

            <form className="login-form">
               <h1>Register</h1>
               <label>First Name</label>
               <input type="text"></input>
               <label>Last Name</label>
               <input type="text"></input>
               <label>Email</label>
               <input type="email"></input>
               <lable>Password</lable>
               <input type="password"></input>
               <lable>Confirm Password</lable>
               <input type="password"></input>
               <input type="checkbox"></input>
               <span>Vender</span>
               <button onClick={onClose}>Close</button>
            </form>
         </div>
      </>

   );
}

export default RegisterFormModal;