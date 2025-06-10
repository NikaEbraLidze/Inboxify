import { Link, useNavigate } from "react-router-dom";
import '../style/firstpage.css';
import { useState } from "react";
import Error from "../components/Error";

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function successLogin(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try{
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if(response.ok && data.success){
                navigate("/");
            } else {
                setError(data.message || "Invalid credentials");
            }
        }catch(err){
            console.error("Login error:", err);
            setError("Server error");
        }
    }
    
    return <>
        {error && <Error message={error} />}
        <div className="login-container">
            <div className="login-input">
                <h1>Inboxify</h1>
                <p className="signin">Sign in into your account</p>

                <form className="login-form" onSubmit={successLogin}>
                    <label forhtml="email">Email address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="recipient@inboxify.ge" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                        }}
                        required />

                    <label forhtml="password">Password</label>
                    <input 
                        type="password" 
                        minLength="6"
                        id="password" 
                        name="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        required />

                    <Link to='/forgotpassword' className="forgotpassword">forgot password?</Link>
                    <button className="btn" type="submit">Sign in</button>
                </form>
                    {/* <div className="divider">
                        <span>or</span>
                    </div>
                    <button className="google">Continue with Google</button> */}
                <p className="registration">Don't have an account? <Link to="/create">Sign up</Link></p>
            </div>
        </div>
    </>
}