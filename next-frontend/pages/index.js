// pages/index.js
import Link from "next/link";
import Image from 'next/image';
import logo from '../public/logo.png';

const Index = () => {

  return (
    <div className="landing-page-main-container">
      <div className="landing-page-navbar">
        <div className="logo">
          <Image src={logo} width={"108"} height={"108"}/>
          <div> HelpCenter</div>
        </div>

        <div className="links">
          
            <a>
              <div>Learn More</div>
            </a>
            <a>
              <div>Sign Up</div>
            </a>
            <a><div>Login</div></a>
            <a><div>About Us</div></a>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
