import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    async function handleLogout() {
        try {
        const res = await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            navigate("/welcome");
        } else {
            console.error("Logout failed");
        }
        } catch (err) {
        console.error("Error during logout:", err);
        }
    }

    const headings = {
        "/": "Inbox",
        "/sent": "Sent",
        "/draft": "Draft",
        "/trash": "Trash"
    };

    function heading() {
        return headings[path] || "Mailbox";
    }

    return<>
        <header className="header"> 
            <div className="header-container">
                <h2>{heading()}</h2>
                <input className="search" type="text" placeholder="Search mail" />
                <p className="signout" onClick={handleLogout}>Sign out</p>
            </div>
        </header>
    </>
}