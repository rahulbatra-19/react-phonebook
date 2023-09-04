import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axios from "axios";
import Tooltip from "./Tooltip";

function App() {
  const [data, setData] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [hoveringAddContact, setHoveringAddContact] = useState(false);
  const [contactId, setContactId] = useState(
    data.length > 0 ? data[data.length - 1] + 1 : 11
  );
  // this form dat is like the json object in the api for better editing and adding the data
  const htmlFormData = {
    id: contactId,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    phone: "",
    company: {
      name: "",
    },
  };
  const [formData, setFormData] = useState(htmlFormData);
  // This function handles add contact functionlity
  const handleAddContact = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );
      setContactId(contactId + 1);
      const newContact = { ...response.data, id: contactId };
      setData((prevData) => [...prevData, newContact]);
      setShowForm(false);
      setFormData(htmlFormData);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  // This function function handles the fomt data of keys address which is object in the form of add contact
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);

    setFormData((prevContact) => ({
      ...prevContact,
      address: {
        ...prevContact.address,
        [name]: value,
      },
    }));
  };
  // This function function handles the form data of keys which is an object Company in the form of add contact
  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);

    setFormData((prevContact) => ({
      ...prevContact,
      company: {
        ...prevContact.company,
        [name]: value,
      },
    }));
  };
  // This function function handles the form data of keys which are not objects in the form of add contact
  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // this is for fetching the data from the api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //  this function handles the deletion of the contact from api although it is an dummy api still
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${contactId}`
      );
      // Update state after successful deletion
      const filteredArray = data.filter((contact) => contact.id != contactId);
      setData(filteredArray);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  //  this function handles the editing  of the contact from api although it is an dummy api still
  const handleUpdateContact = async (contactId, updatedContact) => {
    try {
      console.log("contactID", contactId);
      if (contactId <= 10) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${contactId}`,
          updatedContact
        );

        // Update state after successful deletion
        setData((prevData) =>
          prevData.map((contact) =>
            contact.id === contactId ? response.data : contact
          )
        );
      } else {
        setData((prevData) =>
          prevData.map((contact) =>
            contact.id === contactId ? updatedContact : contact
          )
        );
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="App">
      <div className="mainHeading">
        <h1>Contacts</h1>
        <button
          className="addContact"
          onClick={() => setShowForm(true)}
          onMouseEnter={() => setHoveringAddContact(true)}
          onMouseLeave={() => setHoveringAddContact(false)}
        >
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/officel/40/add-user-male.png"
            alt="add-user-male"
          />
          {hoveringAddContact && (
            <Tooltip position={"top"} content={"Add Contact"} />
          )}
        </button>
      </div>
      {showform && (
        <div className="formAddContact">
          <form>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter Username"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
            <label> Address: </label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressInputChange}
              placeholder="Enter Street name"
            />
            <input
              type="text"
              name="suite"
              value={formData.address.suite}
              onChange={handleAddressInputChange}
              placeholder="Enter suite name"
            />
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressInputChange}
              placeholder="Enter City Name"
            />
            <input
              type="text"
              name="zipcode"
              value={formData.address.zipcode}
              onChange={handleAddressInputChange}
              placeholder="Enter Zipcode"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
            />
            <input
              type="text"
              name="name"
              value={formData.company.name}
              onChange={handleCompanyInputChange}
              placeholder="Enter Company name"
            />
            <div>
              <button onClick={handleAddContact}>Submit Form</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <ul role="list" className="contactList">
        {/* {console.log("jojojo", data)} */}
        {data.map((contact, index) => (
          <ContactCard
            contact={contact}
            key={`Contact-${index}`}
            onDelete={handleDeleteContact}
            onUpdate={handleUpdateContact}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
