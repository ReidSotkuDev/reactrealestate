import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./currentRequest.scss";
import { useLocation } from 'react-router-dom';
import { updateDocumnet, getDocsdata ,getCollectiondata } from '../../../utilities/firebase-functions'
import SelectedCurrentRequest from "./SelectedCurrentRequest";
var Carousel = require('react-responsive-carousel').Carousel;

const SingleMileStone = ({ }) => {

    //declarations
    const location = useLocation();
    let navigate = useNavigate();
    const [milestone, setmilestone] = useState(null)
    const [isDenyActive, setisDenyActive] = useState(false)
    const [isApproveActive, setisApproveActive] = useState(false)
    const [url, seturl] = useState(null)

    //functions
    const getmilestone = async () => {
        
        let currentUser = JSON.parse(localStorage.getItem("user-auth"))
        let currentUserDoc = JSON.parse(localStorage.getItem("currentuser"))
        let bankData = await getCollectiondata(currentUserDoc.companyName)
        let url = `${currentUserDoc.companyName}/${bankData[0].id}/Loan Officers/${currentUser.user.uid}/LOusers/${location.state.data.userId}/Project Information/${location.state.data.projectName}/Milestone`;
        seturl(url)
        let milestone = await getDocsdata(url, location.state.milestonename)
        setmilestone(milestone)
    }
    const handleClick = (handler) => {
        setisDenyActive(false)
        setisApproveActive(false)
        if (handler == "deny") {
            setisDenyActive(true)
            setisApproveActive(false)
            milestone.activerequest = true
        }
        else {
            setisDenyActive(false)
            setisApproveActive(true)
            milestone.activerequest = false
        }
        setmilestone(milestone)
        console.log(milestone)
    }
    const submit = () => {
        if (!isDenyActive && !isApproveActive) {
            alert("Select Request Status !!")
            return;
        }
       let result =  updateDocumnet(url , location.state.milestonename , milestone)
       navigate(`/recap/${location.state.milestonename}` , {state:{projectData:location.state.data , collectionUrl:url , doc:location.state.milestonename ,  data:milestone}})
    }

    //on Load
    useEffect(() => {
        
        getmilestone()
    }, []);


    return (
        <section className="selectedCurrentRequest">

            <div className="selectedCurrentRequest-header header">
                <h1 style={{ margin: "2.2rem 0 0.5rem 0" }}>

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

                <h2>{location.state.milestonename}</h2>

                <div className="section">
                    <div className="row content-center">
                        {Array.isArray(milestone?.image) ?
                            <Carousel showArrows={true} showIndicators={false} showThumbs={false} width={500}>
                                {milestone?.image.map((image, idx) => {
                                    return (
                                        <div>
                                            <img className="img-carousel" src={image} />
                                        </div>
                                    );
                                })}
                            </Carousel> :
                            <div className="customcarousel">
                                <img className="img-carousel" src={milestone?.image} />
                            </div>
                        }


                        <br />
                        <br />
                        <br />
                        <div className="">
                            <button className={isDenyActive ? 'active deny-btn' : 'deny-btn'} onClick={() => handleClick("deny")}>Deny</button>
                            <button className={isApproveActive ? 'active approve-btn' : 'approve-btn'} onClick={() => handleClick("approve")}>Approve</button>
                            <br />
                            <br />
                            <br />
                            <button className="submit-btn" onClick={() => submit()}>Submit</button>
                        </div>
                    </div>



                </div>



            </div>

        </section >
    );
};

export default SingleMileStone;
