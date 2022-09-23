import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { FirebaseApp } from "firebase/app";
import { db } from "./firebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const router = useRouter();
  const signupMsg = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        try {
          const docRef = await addDoc(collection(db, "authorities"), {
            authorityID: user.uid,
            authorityEmail: email,
            authorityName: userName,
            authorityZone: "Mumbai",
          });
          console.log("Document written with ID: ", docRef.id);
          alert("Successfully registered");
          router.push("/login");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signupMsg();
            }}
            className="right-container"
          >
            <h2>Create an account</h2>
            <div className="field">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Email address</p>
              <input
                type="text"
                placeholder="Example@gmail.com"
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
            {/* <div className="field">
              <p>Select a profile picture (optional):</p>
              <input
                type="file"
                // onChange={(e) => setImage(e.target.files[0])}
              />
            </div> */}
            <input type="submit" value="Create account" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

/* <div className="">
</div>; */
