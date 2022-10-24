import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./currentProject.scss";
import SelectedProject from "./SelectedProject";
import {getCollectiondata} from '../../../utilities/firebase-functions'




const CurrentProject = () => {


  useEffect(() => {

    getCurrentProjects()
  }, []);
  const [selectedProjectView, setSelectedProjectView] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
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
            if (!milestone.activerequest  && (!milestone.hasOwnProperty('isArchived') || !milestone.isArchived)) {
              projectInfo.push({ totalloanamount:project.totalloanamount,"percentage": project.projectcomplete, "projectName": project.address, officerName: user.firstName + user.lastName , userId : user.id , bank:bankData[0].id });
              break;
            }
          }
          
        }
      }
    }
    setcurrentProject(projectInfo)
    setshowLoader(false)




  }
  // const projectList = [
  //   {
  //     percentage: "12%",
  //     projectName: "27 Brown St. Gibsonia, PA 15044",
  //     officerName: "john smith",
  //   },
  //   {
  //     percentage: "12%",
  //     projectName: "199 Tanglewood Lane Perrysburg, OH 43551",
  //     officerName: "Walter White",
  //   },
  //   {
  //     percentage: "17%",
  //     projectName: "715 Bohemia Dr. Independence, KY 41051",
  //     officerName: "Random guy",
  //   },
  //   {
  //     percentage: "2%",
  //     projectName: "8165 Homestead Dr. Westford, MA 01886",
  //     officerName: "Smity walnut",
  //   },
  // ];

  return !selectedProjectView ? (
    <>
      <section className="currentProject">
        <div className="currentProject-header header">
          <h1 style={{ margin: "1rem 0" }}>Current Project</h1>
        </div>
        <div className="currentProject-searchBar">
          <div>
            <input type="text"></input>
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="currentProject-tiles">


        {showLoader ? <div className="row textcenter">
            <h3><i>... Loding Current Projects ...</i></h3>
          </div> : null}

          {!showLoader && currentProject.length == 0 ? <div className="row textcenter">
            <h3><i> No Current Projects Found</i></h3>
          </div>:null}
          {currentProject.map((project, idx) => {
            return (
              <div
                className="currentProject-tile flex"
                onClick={(event) => {
                  setSelectedProjectData(project);
                  setSelectedProjectView(true);
                }}
              >
                <div className="currentProject-tile-ps tile-item">
                  {project.percentage}
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
      <SelectedProject
        selectedProjectData={selectedProjectData}
        setSelectedProjectView={setSelectedProjectView}
      />
    </>
  );
};

export default CurrentProject;
