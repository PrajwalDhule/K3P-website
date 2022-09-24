import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getStorage } from "firebase/";
const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(undefined);
  const router = useRouter();
  const loginMsg = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("logged in!");
        console.log("Logged in as " + email + " and user credential ");
        // ...
        // navigate("/dashboard");
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="signInUp-body body">
      <div className="box">
        <div className="left">
          <img src="/welcome.svg"></img>
          <p>WELCOME TO HELPALERT</p>
        </div>
        <div className="right">
          <div className="top-buttons">
            <Link href="/">
              <button>Home</button>
            </Link>
            <Link href="/signup">
              <button>Sign up</button>
            </Link>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMsg();
            }}
            className="right-container"
          >
            <h2>Login to your account</h2>
            <div className="field">
              <p>Email</p>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Password</p>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Log in" />
          </form>
        </div>
      </div>
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="shape3"></div>
    </div>
  );
};

export default Login;

/* <div className="">
</div>; */
