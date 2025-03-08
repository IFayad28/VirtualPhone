import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:8000/contactInfo');
        if (!response.ok) {
          throw new Error('Failed to get Contact Info');
        }
        const data = await response.json();
        console.log(data);
        setContacts(data);
      } catch {
        console.log('Error');
      }
    };
    fetchContacts();
  }, []);
  return (
    <>
      {contacts.map((contact) => (
        <li className="contactSlot" key={contact.id}>
          {contact.first_name} {contact.last_name}
          <div>{contact.email}</div>
          <div>{contact.phone_number}</div>
          <button className="editBtn">Edit</button>
        </li>
      ))}
    </>
  );
};

export default ContactList;
