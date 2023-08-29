import { useEffect, useState } from "react";

function ContactCard(props) {
  const { contact } = props;
  const [showDescription, setShowDescription] = useState(false);
  useEffect(() => {}, [showDescription]);

  return (
    <li className="contactListItem">
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
          <a href={`mailto:${contact.email}`} className="EmailATag">
            <img
              className="EmailImg"
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/785646/send-mass-email.png"
              alt="send-mass-email"
            />
          </a>

          <button
            className="showDescriptionButton"
            onClick={() => setShowDescription(!showDescription)}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/dusk/64/785646/business-contact.png"
              alt="business-contact"
            />
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
          <div className="phoneNo">
            <a href={`tel:${contact.phone}`}>
              {" "}
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/ios-glyphs/30/785646/phone--v1.png"
                alt="phone--v1"
              />
              {contact.phone}
            </a>
          </div>
        </div>
      )}
    </li>
  );
}

export default ContactCard;
