import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axios from "axios";
import Tooltip from "./Tooltip";

function App() {
  const [data, setData] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [hoveringAddContact, setHoveringAddContact] = useState(false);
  const [formData, setFormData] = useState({
    id: data.length + 1,
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
  });

  const handleAddContact = async (event) => {
    event.preventDefault();
    try {
      console.log("hah");
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );
      console.log(response.data);
      setData((prevData) => [response.data, ...prevData]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
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
  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${contactId}`
      );
      // Update state after successful deletion
      setData((prevData) =>
        prevData.filter((contact) => contact.id !== contactId)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  const handleUpdateContact = async (contactId, updatedContact) => {
    try {
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
