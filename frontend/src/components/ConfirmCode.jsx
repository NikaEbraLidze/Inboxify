import { Link } from "react-router-dom";

export default function RegistrationS({ formData, handleChange, handleSubmit }){
    return<>
        <div className="login-container">
            <div className="login-input">
                <h1>Inboxify</h1>
                <p className="signin">Check your email and enter the code sent to you</p>

                <form className="login-form" onSubmit={(e) => handleSubmit(e, "thirdPage", "success")}>
                    <label forhtml="code">Enter code</label>
                    <input type="text" id="code" onChange={handleChange} value={formData.recEmail} name="password" placeholder="nikaebralidze@gmail.com" required />

                    <button className="btn" type="submit">Next</button>
                </form>

                <p className="registration">You have an account? <Link to="/signin">Sign in</Link></p>
            </div>
        </div>
    </>
}