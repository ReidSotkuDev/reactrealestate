import React from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./newProject.scss";

const NewProject = () => {
  return (
    <section className="newProject">
      <div className="newProject-header header">
        <h1>New Project</h1>
      </div>
      <div className="newProject-form">
        <form>
          <label for="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Type here..."
          ></input>
          <label for="username">Client Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Type here..."
          ></input>
          <label for="loanAmount">Total Loan Amount</label>
          <input
            type="text"
            name="loanAmount"
            id="loanAmount"
            placeholder="Type here..."
          ></input>
          <label for="charge">Loan Officer In Charge</label>
          <input
            type="text"
            name="charge"
            id="charge"
            placeholder="Type here..."
          ></input>
          <label for="contactInfo">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            placeholder="Type here..."
          ></input>
          <button className="newProject-form-submitBtn">
            <Link to="/milestone">SUBMIT</Link>
          </button>
        </form>
      </div>
      <div className="homeBtn">
        <Link to="/home">
          <img src={homePNG} alt="home"></img>
        </Link>
      </div>
    </section>
  );
};

export default NewProject;
