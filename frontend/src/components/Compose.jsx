import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function Compose(props){
    const [ formData, setFormData ] = useState(initFormData());
    const [ success, setSuccess ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState(""); 

    function initFormData() {
        return {
            to: "", subject: "", message: ""
        };
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData)
    }

    async function composeEmail(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/compose", {
                method: "POST",
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setSuccessMessage("Message sent successfully");
                setFormData(initFormData());
            } else {
                props.error(data.message || "Compose failed");
            }
        } catch (err) {
            console.error(err);
            props.error("Server error");
        }
    }

    async function draftEmail(e){
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/addtodraft", {
                method: "POST",
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setSuccessMessage("Draft saved successfully");
                setFormData(initFormData());
            } else {
                props.error(data.message || "draft failed");
            }
        } catch (err) {
            console.error(err);
            props.error("Server error");
        }
    }

    return (
        <section className="compose-section show-new-message">
            <div className="message-heading">
                <h2>New Message</h2>
                <CloseIcon className="close" onClick={props.handleFunction}/>
            </div>

            {!success ? (
                <form className="compose-form" onSubmit={composeEmail}>
                    <label htmlFor="to">To</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        placeholder="recipient@inboxify.ge"
                        required
                        onChange={handleChange}
                        value={formData.to}
                    />

                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                        onChange={handleChange}
                        value={formData.subject}
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Type your message..."
                        rows="5"
                        required
                        onChange={handleChange}
                        value={formData.message}
                    ></textarea>

                    <div className="btn-container">
                        <button className="btn draft" type="button" onClick={draftEmail}>Draft</button>
                        <button className="btn" type="submit">Send</button>
                    </div>
                </form>
            ): (
                <p className="success-message">{successMessage}</p>
            )}
        </section>
    );
}
