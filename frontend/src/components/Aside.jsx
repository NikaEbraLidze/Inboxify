import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function Aside(props){
    const [burgerMenu, setBurgerMenu] = useState(false);
    // const [ative, setActive] = useState()

    function handleClick(){
        setBurgerMenu(!burgerMenu);
    }
    return <>
        <aside className={`sidebar ${burgerMenu && 'show' }`}>
            <h1 className="main-text"><a href="#">Inboxify</a></h1>
            <a className="compose" href="#" onClick={props.handleFunction}><span>Compose</span></a>
            <a className="nav-btn active" href="#"><AllInboxIcon /> <span> Inbox</span></a>
            <a className="nav-btn" href="#"><SendIcon /><span>Sent</span></a>
            <a className="nav-btn" href="#"><DraftsIcon /><span>Draft</span></a>
            <a className="nav-btn" href="#"><DeleteOutlineIcon /><span>Trash</span></a>
            <a className="nav-btn sign-out" href="#"><span>Sign out</span></a>
        </aside>

        <aside className="mobile-sidebar">
            <h1 className="main-text"><a href="#">Inboxify</a></h1>
            <a className="compose" href="#" onClick={props.handleFunction}><span>Compose</span></a>
            <input className="search-mobile" type="text" placeholder="Search mail" />
            <a className="signout" href="#" >Sign out</a>
            <MenuIcon className="menu-bar" onClick={handleClick}/>
        </aside>
    </>
}