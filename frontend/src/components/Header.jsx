import { Link, useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();

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

    return<>
        <header className="header"> 
            <div className="header-container">
                <h2>Inbox</h2>
                <input className="search" type="text" placeholder="Search mail" />
                <p className="signout" onClick={handleLogout}>Sign out</p>
            </div>
        </header>
    </>
}