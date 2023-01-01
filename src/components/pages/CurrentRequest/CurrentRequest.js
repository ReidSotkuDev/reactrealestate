import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import SelectedCurrentRequest from "./SelectedCurrentRequest";

import { getCollectiondata } from '../../../utilities/firebase-functions'

const CurrentRequest = () => {
  const [openRequestView, setOpenRequestView] = useState(false);
  const [selectedRequestData, setSelectedRequestData] = useState(null);
  const [currentRequestList, setCurrentRequestList] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  useEffect(() => {
    getCurrentRequests()
  }, []);


  const getCurrentRequests = async () => {

    setshowLoader(true);
    let currentUser = JSON.parse(localStorage.getItem("user-auth"))
    let currentUserDoc = JSON.parse(localStorage.getItem("currentuser"))
    let projectInfo = []


    let bankData = await getCollectiondata(currentUserDoc.companyName)
    let usersData = await getCollectiondata(`${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers`)
    for (let index = 0; index < usersData.length; index++) {
      const user = usersData[index];
      projectInfo = [];
      let projectInfodata = await getCollectiondata(`${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${user.id}/Project Information`)
      for (let j = 0; j < projectInfodata.length; j++) {
        const project = projectInfodata[j];
        if (project.currentrequest) {
          let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${user.id}/Project Information/${project.address}/Milestone`
          let milestones = await getCollectiondata(url)
          for (let index = 0; index < milestones.length; index++) {
            const milestone = milestones[index];
            if (milestone.activerequest) {
              projectInfo.push({ totalloanamount: project.totalloanamount, "percentage": project.projectcomplete, "projectName": project.address, officerName: user.firstName + user.lastName, userId: user.id, bank: bankData[0].id });
              break;
            }
          }

        }
      }
      console.log('data----' , projectInfo)
    }
    setCurrentRequestList(projectInfo)
    setshowLoader(false)
  }

  return !openRequestView ? (
    <section className="currentRequest">
      <div className="currentRequest-header header">
        <h1 style={{ margin: "2rem 0" }}>Current Open Request</h1>
      </div>
      <div className="currentProject-searchBar">
        <div>
          <input type="text"></input>
          <i className="bx bx-search"></i>
        </div>
      </div>
      <div className="currentProject-tiles">
        {showLoader ? <div className="row textcenter">
          <h3><i>... Loding Current Requests ...</i></h3>
        </div> : null}
        {!showLoader && currentRequestList.length == 0 ? <div className="row textcenter">
          <h3><i>No  Requests Found</i></h3>
        </div> : null}
        {currentRequestList.map((project, idx) => {
          return (
            <div
              className="currentProject-tile flex"
              onClick={(event) => {
                setSelectedRequestData(project);
                setOpenRequestView(true);
              }}
            >
              <div className="currentProject-tile-ps tile-item">
                {project.percentage}%
              </div>
              <div className="currentProject-tile-name tile-item">
                {project.projectName}
              </div>
              <div className="currentProject-tile-officerName tile-item">
                {project.officerName}
              </div>
            </div>
          );
        })}
      </div>
      <div className="homeBtn">
        <Link to="/home">
          <img src={homePNG} alt="home"></img>
        </Link>
      </div>
    </section>
  ) : (
    <>
      <SelectedCurrentRequest
        selectedCurrentRequest={selectedRequestData}
        setOpenRequestView={setOpenRequestView}
      />
    </>
  );
};

export default CurrentRequest;
