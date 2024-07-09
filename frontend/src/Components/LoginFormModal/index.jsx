import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginFormModal.css"

function LoginFormModal({ onClose }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberme, setRememberme] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate();

   // event: React.ChangeEvent<HTMLInputElement>
   const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "rememberme") setRememberme(event.target.checked);
   };

   const handleRegisterClick = () => {
      navigate("/register");
   };

   // event: React.FormEvent<HTMLFormElement>
   const handleSubmit = (event) => {
      event.preventDefault();
      if (!email || !password) {
         setError("Please fill in all fields.");
      } else {
         setError("");
         let loginUrl = "";
         if (rememberme == true)
            loginUrl = "/login?useCookies=true";
         else
            loginUrl = "/login?useSessionCookies=true";

         fetch(loginUrl, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               email: email,
               password: password
            })
         }).then((resp) => {
            console.log(resp);
            if (resp.ok) {
               setError("Successful login.");
               // redirect to /, force full browser reload so all cookies are set.
               // TODO: navigate to 'authorizeview' page that triggered login
               window.location.href = '/vendors';
            } else {
               setError("Credentials did not match.");
            }
         }).catch((error) => {
            console.error(error);
            setError("Error logging in.");
         });
      }
   };

   return (
      <div className="modal">
         <div className="modal-background" onClick={onClose}></div>
         <div className="modal-content">

            <form className="login-form">
               <h2 className="form-title">Login</h2>
               <label>Email</label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
               />
               <label>Password</label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
               />
               <div id="remember-box">
                  <input
                     type="checkbox"
                     id="rememberme"
                     name="rememberme"
                     checked={rememberme}
                     onChange={handleChange} />
                  <span>Remember Me</span>
               </div>
               <button type="submit" className="submit-button">Submit</button>
            </form>
         </div>
      </div>
   );
}

export default LoginFormModal;
