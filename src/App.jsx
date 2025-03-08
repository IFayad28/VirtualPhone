import { Routes, Route } from 'react-router-dom';
import PhoneHome from './components/PhoneHome';
import Phone from './layout/Phone';
import ContactsHomePage from './pages/ContactsHomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PhoneHome />} />
      <Route path="/ContactsHomePage" element={<ContactsHomePage />} />
    </Routes>
  );
}

export default App;
