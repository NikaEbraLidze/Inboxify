import { useState } from "react"
import Compose from "../components/Compose"
import Aside from "../components/Aside"
import Header from "./Header"
import MailList from "./Maillist.jsx"
import Error from './Error'

export default function Layeout(props){
    const [ compose, setCompose] = useState(false);
    const [ error, setError ] = useState(false);

    function handleClick(){
        setCompose(!compose);
    }

    function handleError(err){
        setError(err);
    }

    return <>
        {error && <Error message={error} />}
        <div className="layout">
            
            <Aside handleFunction={handleClick} />
            <div className="main">
                <Header/>
                {props.isMessage ? props.FullMail : <section className="content">
                    <MailList
                        mails={props.mails}
                    />
                </section>}
            </div>
            {compose && <Compose handleFunction={handleClick} error={handleError} />}
        </div>
    </>
}