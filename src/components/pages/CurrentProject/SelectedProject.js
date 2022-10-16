import React, { useState } from "react";
import "./currentProject.scss";
import m1 from "../../../assets/images/m1.png";
import m2 from "../../../assets/images/m2.png";
import m3 from "../../../assets/images/m3.png";
const SelectedProject = ({
  selectedProjectData: projectData,
  setSelectedProjectView: goBack,
}) => {
  const [completedMilestonesList, setCompletedMilestonesList] = useState([
    {
      date: "02/17/2022",
      name: "Roughgrade",
      img: m1,
    },
    {
      date: "02/12/2022",
      name: "Footings",
      img: m2,
    },
    {
      date: "02/11/2022",
      name: "Plumbing rough-in",
      img: m3,
    },
  ]);

  return (
    <section className="selectedProject">
      <div
        className="selectedProject-back"
        onClick={() => {
          goBack(false);
        }}
      >
        <i className="bx bx-left-arrow-alt"></i>
      </div>
      <div className="selectedProject-header header">
        <h1 style={{ margin: "2.2rem 0 0.5rem 0" }}>
          {projectData.projectName}
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
                  <img src={milestone.img} alt="milestone-name"></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="selectedProject-details">
        <div className="selectedProject-details-loan">
          <h1>Total Loan</h1>
          <h1>100000 $</h1>
        </div>
        <div className="selectedProject-details-used">
          <h1>% Used</h1>
          <h1>2% / 2000$</h1>
        </div>
        <div className="selectedProject-details-available">
          <h1>% Available</h1>
          <h1>3% / 3000$</h1>
        </div>
      </div>
      <div className="selectedProject-archiveBtn">Send to archive</div>
    </section>
  );
};

export default SelectedProject;
