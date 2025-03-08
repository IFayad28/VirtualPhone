import HomeButton from '../components/HomeButton';
import BackGround from '../components/BackGround';
import PhoneTop from '../components/PhoneTop';

const Phone = ({ children }) => {
  return (
    <>
      <div className="phone">
        <BackGround />
        <PhoneTop />
        {children}
        <HomeButton />
      </div>
    </>
  );
};

export default Phone;
