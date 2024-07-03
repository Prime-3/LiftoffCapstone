
function LoginFormModal({ onClose }) {
   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form">
               <h1>Login</h1>
               <label>Username</label>
               <input type="text" required></input>
               <lable>Password</lable>
               <input type="password" required></input>
               <button type="submit">Submit</button>
            </form>
         </div>
      </div>
   );
}

export default LoginFormModal;
