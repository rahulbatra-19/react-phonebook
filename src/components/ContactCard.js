function ContactCard(props) {
  const { contact } = props;
  console.log(contact);
  return (
    <li className="">
      <img className="" src="" alt="" />
      <div className="">
        <h1 className="">{contact.name}</h1>
      </div>
    </li>
  );
}

export default ContactCard;
