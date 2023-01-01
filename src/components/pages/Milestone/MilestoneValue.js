import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./milestone.scss";
import { useLocation } from 'react-router-dom';
import { updateDocumnet, getCollectiondata, addCollection, updateAddDocument } from "../../../utilities/firebase-functions";
import { useNavigate } from "react-router-dom";

const MilestoneValue = ({ selectedSelectors }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [totalValue, setTotalValue] = useState(0);
  const [selectedSelectorsWithValue, setSelectedSelectorsWithValue] =
    useState(selectedSelectors);
  let selectedSelectorsWithValues =
    useRef(selectedSelectors);

  useEffect(() => {
    calculateTotalValue(selectedSelectorsWithValue);
  }, [selectedSelectorsWithValue]);

  const calculateTotalValue = (selectedSelectorsWithValue) => {
    let total = 0;
    selectedSelectorsWithValue.forEach((selector) => {
      if (selector.value) {
        total = Number(total) + Number(selector.value);
      }
    });
    setTotalValue(total);
  };

  const updateValueForSelectedSelector = (event, selector) => {
    
    const updatedSelectors = selectedSelectorsWithValue.map((s) => {
      if (s.id === selector.id) {
        return { ...s, value: Number(event.target.value) };
      } else {
        return { ...s };
      }
    });
    selectedSelectorsWithValues.current = updatedSelectors
    setSelectedSelectorsWithValue(updatedSelectors);
  };

  const submitProject = async (event) => {

    event.preventDefault()
    if(totalValue != 100){
      alert("Value must be equal to 100")
      return;
    }
    let currentUser = JSON.parse(localStorage.getItem("user-auth"))
    let currentUserDoc = JSON.parse(localStorage.getItem("currentuser"))
    let bankData = await getCollectiondata(currentUserDoc.companyName)
    let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers`;
    let data =
    {
      bankuid: currentUserDoc.bankuid,
      companyName: currentUserDoc.companyName,
      email: currentUserDoc.email,
      firstName: currentUserDoc.firstName,
      lastName: currentUserDoc.lastName,
      password: currentUserDoc.password,
      role: currentUserDoc.role,
    }

    let collectionData = {
      address: location.state.values.address,
      amountRequested : "",
      clientuid:location.state.values.clientuuid,
      contactinformation:location.state.values.contactinformation,
      currentrequest:true,
      isprojectcomplete:false,
      loanofficer:"",
      projectcomplete:"",
      totalloanamount:location.state.values.totalloanamount
    }
    await updateDocumnet(url, location.state.values.clientuuid, data)
    url = url + `/${location.state.values.clientuuid}/Project Information`;
    await updateAddDocument(url, location.state.values.address, collectionData)
    url = url + `/${location.state.values.address}/Milestone`
    selectedSelectorsWithValues.current.forEach(async (milestone) => {
      let milestoneData = {
        activerequest: false,
        description: "",
        fundedAmount: "",
        image: "",
        isArchieved: false,
        milestonecomplete: false,
        milestonename: milestone.name,
        milestonevalue: milestone.value
      }
      await updateAddDocument(url, milestone.name, milestoneData)
    });

    navigate('/home')
    
    console.log('updatedSelectors', selectedSelectorsWithValues)



  }

  return (
    <section className="milestoneValue">
      <div className="milestoneValue-header header">
        <h1 style={{ margin: "2rem 0 0 0" }}>MILESTONE VALUE(%)</h1>
        <p style={{ textAlign: "center", fontSize: "2rem" }}>
          Use Suggegsted Amounts
        </p>
      </div>
      <form>
        <div className="milestone-selectors flex flex-ai-c flex-jc-c flex-d-c">
          <div className="milestone-selectors-selectAll flex flex-ai-c"></div>
          <div className="milestone-selectors-selectIndividual flex flex-jc-sa">
            {selectedSelectors.map((s, idx) => {
              return (
                <div
                  className="flex flex-ai-c"
                  key={idx}
                  style={{ flex: "1", minWidth: "25%", marginBottom: "25px" }}
                >
                  <input
                    id="selectors-checkbox"
                    type="number"
                    name={s.name}
                    style={{
                      width: "6rem",
                      padding: "1rem 0 1rem 0.8rem",
                      fontSize: "1.5rem",
                    }}
                    placeholder="%"
                    onChange={(event) => {
                      updateValueForSelectedSelector(event, s);
                    }}
                  ></input>
                  <label for={s.name}>{s.name}</label>
                </div>
              );
            })}
          </div>
          <div className="milestoneValue-total">
            <h1>
              Total Value
              <br />
              (must = 100%)
            </h1>
            <hr style={{ margin: "1rem 0" }} />
            <h2>{totalValue}</h2>
          </div>
          <button onClick={submitProject}
            className="milestone-selectors-submitBtn"
          //   onClick={(event) => {
          //     event.preventDefault();
          //     setMilestoneValueView(true);
          //   }}
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="homeBtn">
        <Link to="/home">
          <img src={homePNG} alt="home"></img>
        </Link>
      </div>
    </section>
  );
};

export default MilestoneValue;
