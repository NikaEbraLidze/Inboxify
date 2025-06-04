import CloseIcon from '@mui/icons-material/Close';

export default function Compose(props){
    return <>
        <section className="compose-section show-new-message">
            <div className="message-heading">
            <h2>New Message</h2>
            <CloseIcon className="close" onClick={props.handleFunction}/>
            </div>

            <form className="compose-form">
            <label forhtml="to">To</label>
            <input type="email" id="to" name="to" placeholder="recipient@inboxify.ge" required />

            <label forhtml="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" required />

            <label forhtml="message">Message</label>
            <textarea id="message" name="message" placeholder="Type your message..." rows="5" required></textarea>

            <div className="btn-container">
                <button className="btn draft">Draft</button>
                <button className="btn" type="submit">Send</button>
            </div>
            </form>
        </section>
    </>
}