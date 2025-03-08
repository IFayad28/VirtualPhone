import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactsApp = () => {
  const nav = useNavigate();
  const openContactApp = (e) => {
    e.preventDefault();
    return nav('/ContactsHomePage');
  };
  return (
    <section>
      <form onSubmit={openContactApp}>
        <div className="contactsAppWidget">
          <button></button>
        </div>
      </form>
    </section>
  );
};

export default ContactsApp;
