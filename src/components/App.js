import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
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

  return (
    <div className="App">
      <h1 className="mainHeading">Contacts</h1>
      <ul role="list" className="contactList">
        {data.map((contact, index) => (
          <ContactCard
            contact={contact}
            key={`Contact-${index}`}
            onDelete={handleDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
