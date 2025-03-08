import { useState, useEffect } from 'react';

const BackGround = () => {
  const [className, setClassName] = useState('');
  useEffect(() => {
    if (window.location.pathname === '/ContactsHomePage') {
      setClassName('phoneBckrndContacts');
    } else {
      setClassName('phoneBckrnd');
    }
  }, []);
  return <div className={className}></div>;
};

export default BackGround;
