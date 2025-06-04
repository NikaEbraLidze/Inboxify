import { Link } from "react-router-dom";

export default function RegistrationF({ formData, handleChange, handleSubmit }){
    return<>
        <div className="login-container">
            <div className="login-input">
                <h1>Inboxify</h1>
                <p className="signin">Create your account</p>

                <form className="login-form" onSubmit={(e) => handleSubmit(e, "firstPage", "secondPage")}>
                    <label forhtml="fName">First name</label>
                    <input type="text" id="fName" onChange={handleChange} value={formData.fName} name="fName" placeholder="Nikoloz" required />

                    <label forhtml="lName">Last name</label>
                    <input type="text" id="lName" onChange={handleChange} value={formData.lName} name="lName" placeholder="Ebralidze" required />

                    <label forhtml="username">Username</label>
                    <input type="text" id="username" onChange={handleChange} value={formData.username} name="username" placeholder="nikaebralidze" required />

                    <button className="btn" type="submit">Next</button>
                </form>

                <p className="registration">You have an account? <Link to="/signin">Sign in</Link></p>
            </div>
        </div> 
    </>
}