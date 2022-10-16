import React, { useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./archiveProject.scss";
const ArchiveProject = () => {
  const archiveProjectList = [
    {
      percentage: "12%",
      projectName: "27 Brown St. Gibsonia, PA 15044",
      officerName: "john smith",
    },
    {
      percentage: "25%",
      projectName: " 199 Tanglewood Lane Perrysburg, OH 43551",
      officerName: "Walter White",
    },
  ];

  return (
    <>
      <section className="archiveProject">
        <div className="archiveProject-header header">
          <h1 style={{ margin: "1rem 0" }}>Archive Project</h1>
        </div>
        <div className="archiveProject-searchBar">
          <div>
            <input type="text"></input>
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="archiveProject-tiles">
          {archiveProjectList.map((project, idx) => {
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
  );
};

export default ArchiveProject;
