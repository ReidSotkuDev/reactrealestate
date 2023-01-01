import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./archiveProject.scss";
import SelectedArchievedProject from "./SelectedArchive";
import {getCollectiondata} from '../../../utilities/firebase-functions'




const ArchivedProject = () => {


  useEffect(() => {

    getCurrentProjects()
  }, []);
  const [selectedArchivedView, setSelectedArcivedView] = useState(false);
  const [selectedArchivedData, setSelectedArchivedData] = useState(null);
  const [currentProject, setcurrentProject] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const getCurrentProjects = async () => {


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
            if (!milestone.activerequest  && (milestone.hasOwnProperty('isArchived') && milestone.isArchived)) {
              projectInfo.push({ totalloanamount:project.totalloanamount,"percentage": project.projectcomplete, "projectName": project.address, officerName: user.firstName + user.lastName , userId : user.id , bank:bankData[0].id });
              break;
            }
            else{
              break
            }
          }
          
        }
      }
    }
    setcurrentProject(projectInfo)
    setshowLoader(false)

  }

  return !selectedArchivedView ? (
    <>
      <section className="currentProject">
        <div className="currentProject-header header">
          <h1 style={{ margin: "1rem 0" }}>Archived Project</h1>
        </div>
        <div className="currentProject-searchBar">
          <div>
            <input type="text"></input>
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="currentProject-tiles">


        {showLoader ? <div className="row textcenter">
            <h3><i>... Loding Archived Projects ...</i></h3>
          </div> : null}

          {!showLoader && currentProject.length == 0 ? <div className="row textcenter">
            <h3><i> No Archived Projects Found</i></h3>
          </div>:null}
          {currentProject.map((project, idx) => {
            return (
              <div
                className="currentProject-tile flex"
                onClick={(event) => {
                  setSelectedArchivedData(project);
                  setSelectedArcivedView(true);
                }}
              >
                <div className="currentProject-tile-ps tile-item">
                  {project.percentage == "" ? 0 : project.percentage}
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
    </>
  ) : (
    <>
      <SelectedArchievedProject
        selectedArchivedData={selectedArchivedData}
        setSelectedArcivedView={setSelectedArcivedView}
      />
    </>
  );
};

export default ArchivedProject;
