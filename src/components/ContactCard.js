import styles from "../styles/contact.module.css";

function ContactCard(props) {
  const { contact } = props;
  console.log(contact);
  return (
    <div className={styles.contactDiv}>
      <h1 className="text-3xl font-bold underline">{contact.name}</h1>
      <div className={styles.contactName}></div>
    </div>
  );
}

export default ContactCard;
