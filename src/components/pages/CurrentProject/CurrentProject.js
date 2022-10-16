import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./currentProject.scss";
import SelectedProject from "./SelectedProject";
import { db } from '../../firebase/firebase-config'
import {collection, getDocs, query } from 'firebase/firestore';




const CurrentProject = () => {


  useEffect(() => {

    getCurrentProjects()
  }, []);
  const [selectedProjectView, setSelectedProjectView] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [currentProject, setcurrentProject] = useState([]);
  const getCurrentProjects = async () => {


    let currentUser = JSON.parse(localStorage.getItem("user-auth"))
    let currentProjectArr = [];
    let milestones = [];

    const q = query(collection(db, "918bank"))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    }))
    data.map(async (elem) => {
      const workQ = query(collection(db, `918bank/${elem.id}/Loan Officers/${currentUser.user.uid}/LOusers`))
      const workDetails = await getDocs(workQ)
      const workInfo = workDetails.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      }))

      workInfo.map(async (louserele) => {

        let username = "";
        const workQ = query(collection(db, `918bank/${elem.id}/Loan Officers/${currentUser.user.uid}/LOusers/${louserele.id}/Project Information`))
        const workDetails = await getDocs(workQ)
        if (!workDetails.empty) {
          workDetails.docs.forEach(d => {
            if (d.data()) {

              console.log("-------------", d.data())
            }
          });
          let workInfo = workDetails.docs.map((doc) => ({
            ...doc.data(), id: doc.id
          }))
          console.log(workInfo)

          workInfo.map(async (project) => {
            let workQ = query(collection(db, `918bank/${elem.id}/Loan Officers/${currentUser.user.uid}/LOusers/${louserele.id}/Project Information/${project.id}/Milestone`))
            let workDetails = await getDocs(workQ)
           
            workDetails.docs.forEach(d => {
              if (d.data()) {

                console.log("------------- milestones", d.data())
                if(d.data().activerequest){
                  milestones.push({ 'image': d.data().image , milestonevalue : d.data().milestonevalue , milestonename:d.data().milestonename })
                }
              }
            });
          })

          console.log("milestones---------"  , milestones)
          workInfo.forEach(ele => {
            if(ele.currentrequest){
              console.log('found' , ele)
              debugger
              currentProjectArr.push({'officerName':workInfo[0].loanofficer , "projectName" : ele.address , percentage:ele.projectcomplete , milestones:milestones})
            }
          });
        }

        console.log(currentProjectArr)
        setcurrentProject(currentProjectArr);

        // setWorkData(workInfo);
      })
    })





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


          {currentProject.length == 0 ? <div className="row textcenter">
            <h3><i>... Loding Projects ...</i></h3>
          </div> : null}
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
