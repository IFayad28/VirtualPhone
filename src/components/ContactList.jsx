const ContactList = ({
  contacts = [],
  setContacts,
  setSelectedContact,
  setIsModalOpen,
}) => {
  const deleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/deleteContact/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data.message);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {contacts.map((contact) => (
        <li className="contactSlot" key={contact.id}>
          {contact.first_name} {contact.last_name}
          <div>{contact.email}</div>
          <div>{contact.phone_number}</div>
          <button
            className="editBtn"
            onClick={() => {
              setSelectedContact(contact);
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="deleteContact"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

export default ContactList;
