import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../../../assets/images/loginImg.png";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Firestore } from "firebase/firestore";
import {getDocsdata} from '../../../utilities/firebase-functions'
const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("user-auth")) {
      window.location.pathname = "/home";
    }
  }, []);

  const [credsForLogin, setCredsForLogin] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const login = async (event) => {
    event.preventDefault();
    if (
      validate({ type: "EMAIL" }, credsForLogin.email) &&
      validate({ type: "PASSWORD" }, credsForLogin.password)
    ) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          credsForLogin.email,
          credsForLogin.password
        );
        if (user) {
          debugger
          console.log("user",user);
          setErrorMsg(null);
          
         debugger
          let currentUser = await getDocsdata('userCreationRequests',user.user.uid)
          localStorage.setItem("user-auth", JSON.stringify(user));
          localStorage.setItem("currentuser", JSON.stringify(currentUser));
          window.location.pathname = "/home";
        } else {
          setErrorMsg("Something went wrong. Please try again!");
        }
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("password")) {
          setErrorMsg("Wrong Password");
        } else if (error.message.includes("user")) {
          setErrorMsg("User not found");
        } else if (error.message.includes("network")) {
          setErrorMsg("Someting went wrong! Try again!");
        } else {
          setErrorMsg(error.message);
        }
      }
    } else {
      console.log("invalid creds :))");
      // setErrorMsg("Please enter your email and password");
    }
  };

  const validate = (action, payload) => {
    switch (action.type) {
      case "EMAIL": {
        if (payload) {
          // Email is good
          setErrorMsg("");
          return true;
        } else {
          // Email is not good
          setErrorMsg("Enter your email");
          return false;
        }
      }
      case "PASSWORD": {
        if (payload) {
          if (payload.length >= 6) {
            setErrorMsg("");
            return true;
          } else {
            setErrorMsg("Password should be more than 6 characters");
            return false;
          }
        } else {
          setErrorMsg("Password should be more than 6 characters");
          return false;
        }
      }
      default:
        return false;
    }
  };

  return (
    <section className="login">
      <div className="flex">
        <div className="login-left hide-for-mobile">
          <div className="login-left-imgbox">
            <img src={loginImg} alt="login"></img>
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-header header">
            <h1>Welcome to PhotoLoan</h1>
            <p>Bank Log in</p>
          </div>
          <div className="login-right-form">
            <form>
              {/* <label for="userName">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="John Doe"
                value={credsForLogin.userName}
                onChange={(event) => {
                  setCredsForLogin({
                    ...credsForLogin,
                    userName: event.target.value,
                  });
                }}
              ></input> */}
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your Email here"
                value={credsForLogin.email}
                onChange={(event) => {
                  setCredsForLogin({
                    ...credsForLogin,
                    email: event.target.value,
                  });
                }}
              ></input>
              <label for="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter your Password"
                value={credsForLogin.password}
                onChange={(event) => {
                  setCredsForLogin({
                    ...credsForLogin,
                    password: event.target.value,
                  });
                }}
              ></input>
              <p className="login-right-form-errorMsg">{errorMsg}</p>
              <button
                onClick={(event) => {
                  login(event);
                }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
