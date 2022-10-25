import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./archiveProject.scss";
import {getCollectiondata} from '../../../utilities/firebase-functions'
// import {SelectedArchived} from '../ArchiveProject/SelectedArchive'
const ArchiveProject = () => {
  useEffect(() => {

    getArchivedProjects()
  }, []);
  const [SelectedArchivedView, setSelectedArchivedView] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [archivedProject, setarchivedProject] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const getArchivedProjects = async () => {


    setshowLoader(true);
    let currentUser = JSON.parse(localStorage.getItem("user-auth"))
    let currentUserDoc = JSON.parse(localStorage.getItem("currentuser"))
    let archivedprojectInfo = [];

    let bankData = await getCollectiondata(currentUserDoc.companyName)
    let usersData = await getCollectiondata(`${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers`)
    for (let index = 0; index < usersData.length; index++) {
      const user = usersData[index];
      
      let projectInfodata = await getCollectiondata(`${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${user.id}/Project Information`)
      for (let j = 0; j < projectInfodata.length; j++) {
        const project = projectInfodata[j];
        if (project.currentrequest) {
          let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${user.id}/Project Information/${project.address}/Milestone`
          let milestones = await getCollectiondata(url)
          for (let index = 0; index < milestones.length; index++) {
            const milestone = milestones[index];
            if (!milestone.activerequest  && (!milestone.hasOwnProperty('isArchived') || !milestone.isArchived)) {
              archivedprojectInfo.push({ totalloanamount:project.totalloanamount,"percentage": project.projectcomplete, "projectName": project.address, officerName: user.firstName + user.lastName , userId : user.id , bank:bankData[0].id });
              break;
            }
          }
          
        }
      }
    }
    setarchivedProject(archivedprojectInfo)
    setshowLoader(false)




  }

  return  (
    <>
      <section className="archiveProject">
        <div className="archiveProject-header header">
          <h1 style={{ margin: "1rem 0" }}>Archived Project</h1>
        </div>
        <div className="archiveProject-searchBar">
          <div>
            <input type="text"></input>
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="archiveProject-tiles">
        {showLoader ? <div className="row textcenter">
            <h3><i>... Loding Archived Projects ...</i></h3>
          </div> : null}

          {!showLoader && archivedProject.length == 0 ? <div className="row textcenter">
            <h3><i> No Current Archived Found</i></h3>
          </div>:null}
          {archivedProject.map((project, idx) => {
            return (
              <div className="archiveProject-tile flex">
                <div className="archiveProject-tile-ps tile-item">
                  {project.percentage}
                </div>
                <div className="archiveProject-tile-name tile-item">
                  {project.projectName}
                </div>
                <div className="archiveProject-tile-officerName tile-item">
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
  )
};

export default ArchiveProject;
