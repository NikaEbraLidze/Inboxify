import { useEffect, useState } from "react"
import Layeout from "../components/Layeout"
import "../style/style.css"
import "../style/message.css"

export default function Home(){
    const [mails, setMails] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const res = await fetch("http://localhost:3000/draft", {
            method: "GET",
            credentials: "include",
            });

            if (!res.ok) {
            throw new Error("Not authenticated");
            }

            const data = await res.json();
            setMails(data.emails);
        } catch (err) {
            console.error("Auth error:", err.message);
        }
        };

        fetchProfile();
    }, []);


    return<>
        <Layeout mails={mails}/>
    </>
}