import { useState, useEffect } from "react";

export default function FullMail({ messageId }) {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/viewmail/${messageId}`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setEmail(data.email);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Server error");
      }
    };

    fetchEmail();
  }, [messageId]);

  if (error) return <div>{error}</div>;
  if (!email) return <div>Loading...</div>;

  return (
    <section className="view-mail">
      <div className="view-mail-container">
        <div className="mail-name-container">
          <img className="mail-icon" src="https://cdn-icons-png.flaticon.com/512/3233/3233508.png" alt="sender" />

          <div className="name-mail">
            <h4>{email.senders_name}</h4>
            <p className="inboxify">{email.senders_email}</p>
          </div>
          
        </div>

        <p className="data-m">{email.sent_time}</p>
        {/* <p className="subject">{email.subject}</p> */}

        <textarea className="main-message" readOnly>
          {email.main_text}
        </textarea>
      </div>
    </section>
  );
}
