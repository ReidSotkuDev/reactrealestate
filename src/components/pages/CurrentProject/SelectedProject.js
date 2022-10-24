import React, { useEffect, useState } from "react";
import "./currentProject.scss";
import JsPDF from 'jspdf';
import { getCollectiondata , updateDocumnet } from '../../../utilities/firebase-functions'
import { renderToString } from "react-dom/server";
import { useNavigate } from "react-router-dom";
const SelectedProject = ({
  selectedProjectData,
  setSelectedProjectView: goBack,
}) => {
  const [completedMilestonesList, setCompletedMilestonesList] = useState([]);
  const [usedMileStonePercentage, setUsedMileStonePercentage] = useState(null);
  const [totalMileStoneValue, settotalMileStoneValue] = useState(null);
  let navigate = useNavigate();
  let showmilestones = [];
  let currentUser = JSON.parse(localStorage.getItem("user-auth"))
  const getCurrentProjects = async () => {
    
    
    let url = `918bank/${selectedProjectData.bank}/Loan Officers/${currentUser.user.uid}/LOusers/${selectedProjectData.userId}/Project Information/${selectedProjectData.projectName}/Milestone`
    let milestones = await getCollectiondata(url)
    let totalMileStoneValue = 0;
    milestones.forEach(milestone => {
      if (!milestone.activerequest && (!milestone.hasOwnProperty('isArchived') || !milestone.isArchived)) {

        totalMileStoneValue = totalMileStoneValue + parseFloat(milestone.milestonevalue) 
        showmilestones.push({
          date: "02/11/2022",
          name: milestone.milestonename,
          img: Array.isArray(milestone.image) ? milestone.image[0] : milestone.image
        })
      }
    });

    console.log(showmilestones , totalMileStoneValue)
    settotalMileStoneValue(totalMileStoneValue)
    let usedMileStonePercentage = ((totalMileStoneValue / selectedProjectData.totalloanamount) * 100).toFixed(5);

    setUsedMileStonePercentage(usedMileStonePercentage);
    setCompletedMilestonesList(showmilestones)
  }

  const generatePDF = () => {

    const report = new JsPDF('p',"em",'a4');
   
    report.html(document.querySelector("#report"), {
      callback: function (doc) {
        report.save();
      }
    });
  }
  const sendtoArchive = () => {
    let url = `918bank/${selectedProjectData.bank}/Loan Officers/${currentUser.user.uid}/LOusers/${selectedProjectData.userId}/Project Information/${selectedProjectData.projectName}/Milestone`
    completedMilestonesList.forEach(async milestone => {
      await updateDocumnet(url , milestone.name , {isArchived:true})
    });
    navigate("/archive-projects")
   
  }
  useEffect(() => {
    getCurrentProjects()
  }, []);
  return (
    <section className="selectedProject" id="report" >
      <div
        className="selectedProject-back"
        onClick={() => {
          goBack(false);
        }}
      >
        <i className="bx bx-left-arrow-alt"></i>
      </div>
      <div className="selectedProject-header header" >
        <h1 style={{ margin: "2.2rem 0 0.5rem 0" }}>
          {selectedProjectData.projectName}
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
        <h2>Completed Milestones</h2>
      </div>
      <div className="selectedProject-tiles">
        {completedMilestonesList.map((milestone, idx) => {
          return (
            <div
              className="selectedProject-tile"
              // onClick={(event) => {
              //   setSelectedProjectData(milestone);
              //   setSelectedProjectView(true);
              // }}
            >
              <div className="selectedProject-tile-date tile-item">
                {milestone.date}
              </div>
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
    
      <div className="selectedProject-details">
        <div className="selectedProject-details-loan">
          <h1>Total Loan</h1>
          <h1>${selectedProjectData.totalloanamount}</h1>
        </div>
        <div className="selectedProject-details-used">
          <h1>% Used</h1>
          <h1>{usedMileStonePercentage}% / {totalMileStoneValue}$</h1>
        </div>
        <div className="selectedProject-details-available">
          <h1>% Available</h1>
          <h1>3% / 3000$</h1>
        </div>
      </div>
      <div className="selectedProject-archiveBtn" onClick={sendtoArchive}>Send to archive</div>
      {/* <button onClick={generatePDF} type="button">Export PDF</button> */}
    </section>
  );
};

export default SelectedProject;
