// pages/index.js
// import Axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import Navbar from "../components/navbar";

const Index = () => {

  return (
    <div className="index-body">
      
      <div className="box box-1">
      
      </div>
      <div className="box box-2">
      
      </div>
      {/* <Navbar index="1" /> */}
      <nav>
        <div className="name">
          <img src="/logo.png"></img>
          <p>Helpalert</p>
        </div>
          <div className="menu-items">
          
            <li><Link href="/">
              <div><p>Learn more</p> <img src="/more.svg"></img></div>
            </Link>
            </li>
            <li><Link href="/">
              <div>Sign Up</div>
            </Link>
            </li>
            <li><Link href="/"><div>Login</div></Link></li>
            <li><Link href="/"><div>About Us</div></Link></li>
          
        </div>
      </nav>
      <div className="left">
        <div className="title">
        Get Instant Help in Serious Situations 
        </div>
        <div className="desc">
        Report any problematic situation, earn rewards and get instant updates on your location’s safety on India’s safest and most trustworthy platform for disaster and crime aid
        </div>
        <div className="buttons">
        <div className="left-btn">
        <p>For users:</p>
        <button>Download <img src="/playstore.svg"></img><img src="/apple.svg"></img></button>
        </div>
        <div className="right-btn">
        <p>For Authorities:</p>
        <Link href="/dashboard"><button>Login <img src="/arrow.svg"></img></button></Link>
        </div>
        </div>
      </div>
      <div className="right">
        <img src="/boy3.png"></img>
      </div>
    </div>
  );
};

export default Index;
