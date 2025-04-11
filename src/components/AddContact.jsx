import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, setContacts, selectedContact }) => {
  if (!isOpen) return null;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.first_name);
      setLastName(selectedContact.last_name);
      setEmail(selectedContact.email);
      setPhoneNumber(selectedContact.phone_number);
    } else {
      setFirstName(''), setLastName(''), setEmail(''), setPhoneNumber('');
    }
  }, [selectedContact]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
    };
    try {
      const res = await fetch(
        selectedContact
          ? `http://localhost:8000/updateContact/${selectedContact.id}`
          : 'http://localhost:8000/addContact',
        {
          method: selectedContact ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
          }),
        }
      );

      const data = await res.json();
      console.log('📨 Server response:', data);
      if (!res.ok) {
        alert(`❌ Error: ${data.error}`);
        return;
      }
      onClose();
      // Refetch contacts if you want to auto-refresh
      const updatedRes = await fetch('http://localhost:8000');
      const updatedContacts = await updatedRes.json();
      setContacts(updatedContacts);
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error occurred');
    }
  };
  return (
    <div className="modal-overlay">
      <h2 className="aContact">Contact Details</h2>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit" className="acSubmit">
            Submit
          </button>
        </form>
        <button className="closeModal" onClick={onClose}>
          Close Modal
        </button>
      </div>
    </div>
  );
};

export default Modal;
