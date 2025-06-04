export default function Success({ formData, handleClick }){
    return<>
        <div className="login-container">
            <div className="login-input">
                <div className="correct"></div>
                <p className="signin">Your account has been confirmed.<br />
                    You can now start using inboxify.</p>
                <p className="signin">Your mail: <em>{formData.username + '@inboxify.ge'}</em></p>

                <button className="btn" type="submit" onClick={handleClick}>Continue</button>
            </div>
        </div>
    </>
}