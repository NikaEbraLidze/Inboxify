import Mail from "./Mail";

export default function MailList({ mails }) {
  if (!Array.isArray(mails)) {
    return <p>No emails to show</p>;
  }

  return (
    <>
      {mails.map(mail => (
        <Mail
          key={mail.id}
          name={mail.senders_name}
          id={mail.id}
          subject={mail.subject}
          date={mail.sent_time.slice(0, 10)}
          message={mail.main_text}
        />
      ))}
    </>
  );
}
