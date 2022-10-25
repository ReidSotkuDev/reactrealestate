import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./newProject.scss";
import { projectStore } from '../../../utilities/store'
import { getCollectiondata } from '../../../utilities/firebase-functions'
import { useNavigate } from "react-router-dom";

const NewProject = () => {

  let currentUser = JSON.parse(localStorage.getItem("user-auth")) 
  const [options, setOptions] = useState([])
  let clientInfo = useRef([])
  const [values, setValues] = useState({
    address: "",
    clientuuid: "",
    totalloanamount: "",
    loanofficer: currentUser.user.uid,
    contactinformation: ""
  });
  const [showLoader, setshowLoader] = useState(false);
  let clientInfoarr = []
  let navigate = useNavigate();
  //on Load
  useEffect(() => {

    getClients()
  }, []);
  const getClients = async () => {

    // setshowLoader(true);


    setshowLoader(true)
    let usersData = await getCollectiondata(`userCreationRequests`)
    for (let index = 0; index < usersData.length; index++) {
      const user = usersData[index];
      if (user.role == "client") {
        clientInfoarr.push({ value: user.clientuid, label: user.firstName + user.lastName, loanofficeruid: user.loanuid });
      }
    }
    clientInfo.current = clientInfoarr;
    setOptions(clientInfoarr)
    debugger
    setValues({
      address: "",
      clientuuid: clientInfo.current[0].value,
      totalloanamount: "",
      loanofficer: currentUser.user.uid,
      contactinformation: ""
    })
    setshowLoader(false)
  }

  const handleselectChange = (name) => {
    return ({ target: { value } }) => {
      debugger
      //let selectedoption = clientInfo.current.filter(c => c.value == value)
      // let loanofficeruid = selectedoption[0].loanofficeruid;
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const handleInputChange = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const submit = (event) => {
    event.preventDefault()
    console.log(values)
    navigate(`/milestone`, {
      state: { values },
    })

  };



  return (
    <section className="newProject">
      <div className="newProject-header header">
        <h1>New Project</h1>
      </div>
      <div className="newProject-form">
        <form onSubmit={submit}>
          <label for="address">Address</label>
          <input
            required="true"
            type="text"
            name="address"
            id="address"
            placeholder="Type here..."
            value={values.address}
            onChange={handleInputChange("address")}
          ></input>
          <label for="username">Client Username</label>
          <select value={values.clientuuid} onChange={handleselectChange("clientuuid")}>
            {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
          </select>
          <label for="loanAmount">Total Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            id="loanAmount"
            placeholder="Type here..."
            required="true"
            value={values.totalloanamount}
            onChange={handleInputChange("totalloanamount")}
          ></input>
          <label for="charge">Loan Officer In Charge</label>
          <input
            disabled="true"
            type="text"
            name="charge"
            id="charge"
            value={values.loanofficer}
          ></input>
          <label for="contactInfo">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            required="true"
            placeholder="Type here..."
            value={values.contactinformation}
            onChange={handleInputChange("contactinformation")}
          ></input>
          <button type="submit" className="newProject-form-submitBtn">
            SUBMIT
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
