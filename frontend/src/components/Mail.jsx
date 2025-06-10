import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export default function Mail(props) {
    const [isDeleted, setIsDeleted] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const MoveToTrash = async (id) => {
        if(path === "/"){
            try {
                const res = await fetch(`http://localhost:3000/inbox/${id}`, {
                    method: "PATCH",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to add in trash");

                console.log("Item add in trash");
                setIsDeleted(true);
            } catch (err) {
                console.error("Delete error:", err.message);
            }
        }else{
            try {
                const res = await fetch(`http://localhost:3000/trash/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to delete");

                console.log("Item deleted");
                setIsDeleted(true);
            } catch (err) {
                console.error("Delete error:", err.message);
            }
        }
        
    };

    const Restore = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/restore/${id}`, {
                method: "PATCH",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to restore");

            console.log("Item restored");
            setIsDeleted(true);
        } catch (err) {
            console.error("Delete error:", err.message);
        }
        
    };

    // const handleClick = async (id) => {
    //     try{
    //         const res = await fetch(`http://localhost:3000/viewmail/${id}`);

    //         if (!res.ok) throw new Error("Failed to load message");

    //         navigate(`${path}/${id}`);
    //     }catch(err){
    //         console.error("Failed to load:", err.message);
    //     }
    // }

    if (isDeleted) return null;

    return (
        <div className="mail" onClick={handleClick}>
            <div className="mail-container">
                <h3 className="name">{props.name}</h3>
                <p className="subject">{props.subject}</p>
                <p className="date">{props.date}</p>
            </div>
            <div className="mail-container">
                <p className="short-message">{props.message}</p>
                {path === "/trash" && <SettingsBackupRestoreIcon 
                    className='restore-icon'
                    onClick={() => Restore(props.id)}
                />}
                <DeleteOutlineIcon
                    className='delete-icon'
                    onClick={() => MoveToTrash(props.id)}
                />
            </div>
        </div>
    );
}
