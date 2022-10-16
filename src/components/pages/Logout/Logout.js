import React from "react";
import { Link } from "react-router-dom";
import "./logout.scss";
const Logout = () => {
  const logout = () => {
    localStorage.removeItem("user-auth");
    window.location.pathname = "/";
  };
  return (
    <section className="logout">
      <div className="logout-header header">
        <h1 style={{ margin: "1rem 0" }}>Are You Sure?</h1>
      </div>
      <div className="flex flex-jc-c">
        <button
          onClick={() => {
            logout();
          }}
        >
          Yes
        </button>
        <button>
          <Link to="/home">Cancel</Link>
        </button>
      </div>
    </section>
  );
};

export default Logout;
