
function LoginFormModal({ onClose }) {
   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form">
               <h2 className="form-title">Login</h2>
               <label>Username</label>
               <input type="text" required></input>
               <label>Password</label>
               <input type="password" required></input>
               <button type="submit" className="submit-button">Submit</button>
            </form>
         </div>
      </div>
   );
}

export default LoginFormModal;
