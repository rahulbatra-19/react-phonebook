import { useEffect, useState } from "react";
import styles from "../styles/app.module.css";
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
      <div className={styles.Main}>
        {data.map((contact, index) => (
          <ContactCard contact={contact} key={`Contact-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
