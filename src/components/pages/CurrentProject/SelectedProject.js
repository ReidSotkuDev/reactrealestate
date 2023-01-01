import React, { useEffect, useState } from "react";
import "./currentProject.scss";
import JsPDF from 'jspdf';
import { getCollectiondata, updateDocumnet } from '../../../utilities/firebase-functions'
import { renderToString } from "react-dom/server";
import { useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
// import ImageModal from "../../modal";

const SelectedProject = ({
  selectedProjectData,
  setSelectedProjectView: goBack,
}) => {
  const [completedMilestonesList, setCompletedMilestonesList] = useState([]);
  const [usedMileStonePercentage, setUsedMileStonePercentage] = useState(null);
  const [totalMileStoneValue, settotalMileStoneValue] = useState(null);
  const [isSendtoArchived, setIsSendtoArchived] = useState(true);
  const [showmodal, setShowmodal] = useState(false);
  let navigate = useNavigate();
  let showmilestones = [];
  let currentUser = JSON.parse(localStorage.getItem("user-auth"))
  let currentUserDoc = JSON.parse(localStorage.getItem("currentuser"))
  const getCurrentProjects = async () => {

    let bankData = await getCollectiondata(currentUserDoc.companyName)
    let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${selectedProjectData.userId}/Project Information/${selectedProjectData.projectName}/Milestone`
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
      if(milestone.activerequest){
        setIsSendtoArchived(false)
      } 
    
    });

    console.log(showmilestones, totalMileStoneValue)
    settotalMileStoneValue(totalMileStoneValue)
    let usedMileStonePercentage = ((totalMileStoneValue / selectedProjectData.totalloanamount) * 100).toFixed(5);

    setUsedMileStonePercentage(usedMileStonePercentage);
    setCompletedMilestonesList(showmilestones)
  }

  const generatePDF = () => {

    const report = new JsPDF("p", "pt", 'a4');
    
    let html = document.getElementById("report")

    // report.html(html.inn, {
    //   callback: function (doc) {
    //     report.save();
    //   }
    // });

    html2canvas(html).then(function (canvas) {
      const divImage = canvas.toDataURL("image/png");
      const pdf = new JsPDF();
      pdf.addImage(divImage, 'PNG', 0, 0);
      pdf.save("download.pdf");
    })

  }

  const showModal = () => {
    
    showmodal = !showmodal;
    setShowmodal(showmodal)
  }


 

  const sendtoArchive = async () => {
    let bankData = await getCollectiondata(currentUserDoc.companyName)
    let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${selectedProjectData.userId}/Project Information/${selectedProjectData.projectName}/Milestone`
    
    completedMilestonesList.forEach(async milestone => {
      await updateDocumnet(url, milestone.name, { isArchived: true })
    });
    navigate("/archive-projects")

  }
  useEffect(() => {
    getCurrentProjects()
  
  }, []);
  return (
    <>
       {/* <ImageModal show={showmodal} onClose={this.showModal}/> */}
    <section className="selectedProject"  >
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
      <div className="selectedProject-tiles"   >
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
                  <img src={milestone.img} alt="milestone-name" className="milestoneImage"
                  onClick = {() => {
                    // setshowmodal(true);
                    showModal()
                  }}
                  ></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="selectedProject-details" id="report">
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
      {/* {showmodal ?   : ""}  */}
      {isSendtoArchived ?
        <div className="selectedProject-archiveBtn" onClick={sendtoArchive}>Send to archive</div>
        : ""
      }


      {/* <button onClick={generatePDF} type="button">Export PDF</button> */}
    </section>
    </>
 
  );
};

export default SelectedProject;
