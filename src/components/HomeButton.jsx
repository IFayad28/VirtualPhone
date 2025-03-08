import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomeButton = () => {
  const [button, setbutton] = useState('');
  useEffect(() => {
    if (window.location.pathname === '/ContactsHomePage') {
      setbutton('buttonContacts');
    } else {
      setbutton('buttonHome');
    }
  }, []);
  const nav = useNavigate();
  const Home = (e) => {
    e.preventDefault();
    return nav('/');
  };
  return (
    <form onSubmit={Home}>
      <div className="homeButton">
        <button className={button}></button>
      </div>
    </form>
  );
};

export default HomeButton;
