import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuIcon from '@mui/icons-material/Menu';


export default function Aside(props){
    const [burgerMenu, setBurgerMenu] = useState(false);
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

    function handleClick(){
        setBurgerMenu(!burgerMenu);
    }
    return <>
        <aside className={`sidebar ${burgerMenu && 'show' }`}>
            <h1 className="main-text"><Link to="/">Inboxify</Link></h1>
            <Link className="compose" to="" onClick={props.handleFunction}><span>Compose</span></Link>
            <Link className={`nav-btn ${path === '/' ? 'active' : ''}`} to="/">
                <AllInboxIcon /> <span>Inbox</span>
            </Link>
            <Link className={`nav-btn ${path === '/sent' ? 'active' : ''}`} to="/sent">
                <SendIcon /><span>Sent</span>
            </Link>
            <Link className={`nav-btn ${path === '/draft' ? 'active' : ''}`} to="/draft">
                <DraftsIcon /><span>Draft</span>
            </Link>
            <Link className={`nav-btn ${path === '/trash' ? 'active' : ''}`} to="/trash">
                <DeleteOutlineIcon /><span>Trash</span>
            </Link>
            <p className="nav-btn sign-out" onClick={handleLogout}><span>Sign out</span></p>
        </aside>

        <aside className="mobile-sidebar">
            <h1 className="main-text"><Link to="">Inboxify</Link></h1>
            <Link className="compose" to="" onClick={props.handleFunction}><span>Compose</span></Link>
            <input className="search-mobile" type="text" placeholder="Search mail" />
            <p className="signout" onClick={handleLogout} >Sign out</p>
            <MenuIcon className="menu-bar" onClick={handleClick}/>
        </aside>
    </>
}