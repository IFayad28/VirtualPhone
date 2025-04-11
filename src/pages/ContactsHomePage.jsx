import Phone from '../layout/Phone';
import { IoMdSearch } from 'react-icons/io';
import '../index.css';
import ContactList from '../components/ContactList';
import Modal from '../components/AddContact';
import { useState, useEffect } from 'react';
const ContactsHomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const filteredContacts = contacts.filter((contact) =>
    `${contact.first_name} ${contact.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8000');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('❌ Failed to fetch contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <Phone>
      <div className="contactsHeadContainer">
        <h1 className="contactsTitle">Contacts</h1>
        <span className="addContactBtn">
          <button onClick={() => setIsModalOpen(true)}>+</button>
        </span>

        <div className="searchContacts">
          <input
            type="text"
            placeholder="Search For Contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button>
            <IoMdSearch className="searchIcon" />
          </button>
        </div>
      </div>
      <div className="contactsListContainer">
        <ContactList
          contacts={filteredContacts}
          setContacts={setContacts}
          setSelectedContact={setSelectedContact}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContact(null);
        }}
        selectedContact={selectedContact}
        setContacts={setContacts}
      />
    </Phone>
  );
};

export default ContactsHomePage;
