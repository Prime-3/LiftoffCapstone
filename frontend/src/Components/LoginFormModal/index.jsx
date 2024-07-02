
function LoginFormModal({ onClose }) {
   return (
      <>
         <div className="modal">

            <form className="login-form">
               <h1>Login</h1>
               <label>Username</label>
               <input type="text"></input>
               <lable>Password</lable>
               <input type="password"></input>
               <button onClick={onClose}>Close</button>
            </form>
         </div>
         <div className="modal-background" onClick={onClose}></div>
      </>
   );
}

export default LoginFormModal;