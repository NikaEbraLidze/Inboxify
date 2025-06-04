import { Link } from "react-router-dom";
import inboxify from '../assets/images/inboxify.png';

export default function Login(){
    return<>
        <div className="hello">
            <h1>Inboxify</h1>
            <p>
                Your simple, seamless emailing experience awaits.
            </p>
            <img src={inboxify} alt="inboxify" />
            <div className="btn-container">
                <Link className="create" to="/create">Create new account</Link>
                <Link className="login" to="/signin">Sign in</Link>
            </div>
        </div>
    </>
}