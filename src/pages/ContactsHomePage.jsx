import Phone from '../layout/Phone';
import { IoMdSearch } from 'react-icons/io';
import '../index.css';
import ContactList from '../components/ContactList';
import Modal from './AddContact';
import { useState } from 'react';
const ContactsHomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Phone>
      <div className="contactsHeadContainer">
        <h1 className="contactsTitle">Contacts</h1>
        <span className="addContactBtn">
          <button onClick={() => setIsModalOpen(true)}>+</button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </span>
        <div className="searchContacts">
          <input type="text" placeholder="Search For Contact"></input>
          <button>
            <IoMdSearch className="searchIcon" />
          </button>
        </div>
      </div>
      <div className="contactsListContainer">
        <ContactList />
      </div>
    </Phone>
  );
};

export default ContactsHomePage;
