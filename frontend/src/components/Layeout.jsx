import { useState } from "react"
import Compose from "../components/Compose"
import Aside from "../components/Aside"
import Header from "./Header"
import MailList from "./Maillist.jsx"
import initialMail  from "../data/recivedMails.js"

export default function Layeout(){
    const [compose, setCompose] = useState(false);
    const [mails, setMails] = useState(initialMail);

    const inboxMenu = mails.filter(mail => !mail.inTrash)

    function handleClick(){
        setCompose(!compose);
    }

    function MoveToTrash(id){
        setMails(prev => 
            prev.map(mail => mail.id === id ? { ...mail, inTrash: true } : mail)
        )
    }

    function IsRead(id){
        setMails(prev => 
            prev.map(mail => mail.id === id ? { ...mail, read: true } : mail)
        )
    }
    
    return <>
        <div className="layout">
            <Aside handleFunction={handleClick} />
            <div className="main">
                <Header />
                <section className="content">
                    <MailList
                        mails={inboxMenu}
                        onRead={IsRead}
                        onTrash={MoveToTrash}
                    />
                </section>
            </div>
            {compose && <Compose handleFunction={handleClick}/>}
        </div>
    </>
}