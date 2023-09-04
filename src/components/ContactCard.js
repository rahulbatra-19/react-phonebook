import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

function ContactCard(props) {
  const { contact, onDelete, onUpdate } = props;
  const [contactData, setContactData] = useState(contact);
  const [hoveringDescription, setHoveringDescription] = useState(false);
  const [content, setContent] = useState("");
  const [hoveringEmail, setHoveringEmail] = useState(false);
  const [hoveringEditContact, setHoveringEditContact] = useState(false);
  const [showEditable, setShowEditable] = useState(false);
  const [hoveringDeleteButton, setHoveringDeleteButton] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);

    setContactData((prevContact) => ({
      ...prevContact,
      company: {
        ...prevContact.company,
        [name]: value,
      },
    }));
  };
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevContact) => ({
      ...prevContact,
      address: {
        ...prevContact.address,
        [name]: value,
      },
    }));
  };

  return (
    <li className="contactListItem">
      {showEditable ? (
        <>
          <div className="mainDiv">
            <div className="left">
              Name:
              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleInputChange}
              />
              <p className="contactuserName">
                Username:
                <input
                  type="text"
                  name="username"
                  value={contactData.username}
                  onChange={handleInputChange}
                />
              </p>
            </div>
            <div className="right">
              Company:
              <span>
                <input
                  type="text"
                  name="name"
                  value={contactData.company.name}
                  onChange={handleCompanyInputChange}
                />
              </span>
            </div>
            Email:
            <span>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="Description">
            <div className="location">
              <span>Location:</span>
              <span>
                <input
                  type="text"
                  name="street"
                  value={contactData.address.street}
                  onChange={handleAddressInputChange}
                />
                <br />
                <input
                  type="text"
                  name="suite"
                  value={contactData.address.suite}
                  onChange={handleAddressInputChange}
                />
                <br />
                <input
                  type="text"
                  name="city"
                  value={contactData.address.city}
                  onChange={handleAddressInputChange}
                />
                <br />
                <input
                  type="text"
                  name="zipcode"
                  value={contactData.address.zipcode}
                  onChange={handleAddressInputChange}
                />
              </span>
            </div>
            <div className="rightDescription">
              <div className="phoneNo">
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/ios-glyphs/30/785646/phone--v1.png"
                  alt="phone--v1"
                />
                <input
                  type="tel"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="EditContactSubmit"
                onClick={() => {
                  setShowEditable(false);
                  onUpdate(contact.id, contactData);
                }}
                onMouseEnter={() => {
                  setHoveringEditContact(true);
                  setContent("Submit");
                }}
                onMouseLeave={() => setHoveringEditContact(false)}
              >
                Submit
                {hoveringEditContact && (
                  <Tooltip position={"top"} content={content} />
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mainDiv">
            <div className="left">
              <h3 className="contactName">{contact.name}</h3>
              <p className="contactuserName">@{contact.username}</p>
            </div>
            <div className="right">
              <p>
                <img
                  width="25"
                  height="25"
                  src="https://img.icons8.com/ios/50/785646/company--v1.png"
                  alt="company--v1"
                />
                <span>{contact.company.name}</span>
              </p>
            </div>
            <div className="Buttons">
              <a
                href={`mailto:${contact.email}`}
                className="EmailATag"
                onMouseEnter={() => {
                  setHoveringEmail(true);
                  setContent("Send Email");
                }}
                onMouseLeave={() => setHoveringEmail(false)}
              >
                <img
                  className="EmailImg"
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/785646/send-mass-email.png"
                  alt="send-mass-email"
                />
                {hoveringEmail && (
                  <Tooltip position={"top"} content={content} />
                )}
              </a>

              <button
                className="showDescriptionButton"
                onClick={() => {
                  setShowDescription(!showDescription);
                }}
                onMouseEnter={() => {
                  setHoveringDescription(true);
                  if (showDescription) {
                    setContent("Hide Description");
                  } else {
                    setContent("Show Description");
                  }
                }}
                onMouseLeave={() => setHoveringDescription(false)}
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/dusk/64/785646/business-contact.png"
                  alt="business-contact"
                />
                {hoveringDescription && (
                  <Tooltip position={"top"} content={content} />
                )}
              </button>
              <button
                className="deleteContact"
                onClick={() => onDelete(contact.id)}
                onMouseEnter={() => {
                  setHoveringDeleteButton(true);
                  setContent("Delete Contact");
                }}
                onMouseLeave={() => setHoveringDeleteButton(false)}
              >
                <img
                  width="35"
                  height="30"
                  src="https://img.icons8.com/carbon-copy/50/785646/filled-trash.png"
                  alt="filled-trash"
                />
                {hoveringDeleteButton && (
                  <Tooltip position={"top"} content={content} />
                )}
              </button>
            </div>
          </div>
          {showDescription && (
            <div className="Description">
              <div className="location">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-filled/50/785646/marker.png"
                  alt="marker"
                />
                <span>
                  {contact.address.street}, <br />
                  {contact.address.suite},<br />
                  {contact.address.city},<br />
                  {contact.address.zipcode}
                </span>
              </div>
              <div className="rightDescription">
                <div className="phoneNo">
                  <a href={`tel:${contact.phone}`}>
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/ios-glyphs/30/785646/phone--v1.png"
                      alt="phone--v1"
                    />
                    {contactData.phone}
                  </a>
                </div>
                <button
                  className="EditContact"
                  onClick={() => setShowEditable(!showEditable)}
                  onMouseEnter={() => {
                    setHoveringEditContact(true);
                    setContent("Edit Contact");
                  }}
                  onMouseLeave={() => setHoveringEditContact(false)}
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/material-rounded/30/785646/writer-male.png"
                    alt="writer-male"
                  />
                  {hoveringEditContact && (
                    <Tooltip position={"top"} content={content} />
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default ContactCard;
