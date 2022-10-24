import React, { useState, useEffect } from "react";
import "./currentRequest.scss";
import { getCollectiondata } from '../../../utilities/firebase-functions'
import { useNavigate } from "react-router-dom";

const SelectedCurrentRequest = ({
  selectedCurrentRequest,
  setOpenRequestView: goBack,
}) => {
  let navigate = useNavigate();
  let showmilestones = [];
  const [milestonesList, setMilestonesList] = useState([]);
  const [setSelectedMileStoneData, setsetSelectedMileStoneData] = useState(null);

  const getCurrentRequests = async () => {
    let currentUser = JSON.parse(localStorage.getItem("user-auth"))
    let url = `918bank/${selectedCurrentRequest.bank}/Loan Officers/${currentUser.user.uid}/LOusers/${selectedCurrentRequest.userId}/Project Information/${selectedCurrentRequest.projectName}/Milestone`
    let milestones = await getCollectiondata(url)
    milestones.forEach(milestone => {
      if (milestone.activerequest) {
        showmilestones.push({
          date: "02/11/2022",
          name: milestone.milestonename,
          img: Array.isArray(milestone.image) ? milestone.image[0] : milestone.image
        })
      }
    });

    console.log(showmilestones)
    setMilestonesList(showmilestones)
  }
  useEffect(() => {
    getCurrentRequests()
  }, []);
  return (
    <section className="selectedCurrentRequest">
      <div
        className="selectedProject-back"
        onClick={() => {
          goBack(false);
        }}
      >
        <i className="bx bx-left-arrow-alt"></i>
      </div>
      <div className="selectedCurrentRequest-header header">
        <h1 style={{ margin: "2.2rem 0 0.5rem 0" }}>
          {selectedCurrentRequest.projectName}
        </h1>
        <hr
          style={{
            maxWidth: "14rem",
            margin: "0 auto",
            backgroundColor: "black",
            border: "none",
            height: "1px",
            outline: "none",
          }}
        />
        <h2>Milestones</h2>
      </div>
      <div className="selectedProject-tiles">
        {milestonesList.map((milestone, idx) => {
          return (
            <div
              className="selectedProject-tile"
              onClick={(event) => {navigate(`/requestSingleMilestone/${milestone.name}` ,  {
               state:{milestonename : milestone.name , image : milestone.img , data:{...selectedCurrentRequest} } ,
              })}}
              key={idx}
            >
              <div className="flex flex-jc-c flex-ai-c">
                <div className="selectedProject-tile-name tile-item">
                  {milestone.name}
                </div>
                <div className="selectedProject-tile-imageBox tile-item">
                  <img src={milestone.img} alt="milestone-name" className="milestoneImage"></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SelectedCurrentRequest;
