import { Link } from "react-router-dom";

export default function RegistrationS({ formData, handleChange, handleSubmit }){
    return<>
        <div className="login-container">
            <div className="login-input">
                <h1>Inboxify</h1>
                <p className="signin">Create your account</p>

                <form className="login-form" onSubmit={(e) => handleSubmit(e, "secondPage", "success")}>
                    <label forhtml="password">Password</label>
                    <input type="password" minLength="6" id="password" onChange={handleChange} value={formData.password} name="password" placeholder="password" required />

                    <label forhtml="confPassword">Confirm password</label>
                    <input type="password" minLength="6" id="confPassword" onChange={handleChange} value={formData.confPassword} name="confPassword" placeholder="Confirm password" required />

                    <button className="btn" type="submit">Next</button>
                </form>

                <p className="registration">You have an account? <Link to="/signin">Sign in</Link></p>
            </div>
        </div>
    </>
}