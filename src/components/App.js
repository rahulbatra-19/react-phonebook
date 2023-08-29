import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl = "https://jsonplaceholder.typicode.com/users";
        const response = await fetch(apiurl);
        const contacts = await response.json();
        console.log(contacts);
        setData(contacts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1 className="mainHeading">Contacts</h1>
      <ul role="list" className="contactList">
        {data.map((contact, index) => (
          <ContactCard contact={contact} key={`Contact-${index}`} />
        ))}
      </ul>
    </div>
  );
}

export default App;
