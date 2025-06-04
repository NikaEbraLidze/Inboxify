import Mail from "./Mail";

export default function MailList({ mails, onRead, onTrash }) {
  return (
    <>
      {mails.map(mail => (
        <Mail
          key={mail.id}
          name={mail.sender.name}
          subject={mail.subject}
          date={mail.date}
          read={mail.read}
          message={mail.message}
          IsRead={() => onRead(mail.id)}
          MoveToTrash={() => onTrash(mail.id)}
        />
      ))}
    </>
  );
}
