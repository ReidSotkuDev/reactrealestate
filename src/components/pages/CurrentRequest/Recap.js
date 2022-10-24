import React, { useState, useEffect } from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./currentRequest.scss";
import { Navigate, useLocation } from 'react-router-dom';
import { updateDocumnet, getDocsdata } from '../../../utilities/firebase-functions'
import { useNavigate } from "react-router-dom";

const Recap = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();
    debugger
    console.log('location.state', location.state)

    //declarations
    const [amountFunnded, setamountFunnded] = useState(0);



    //functions

    const submitfund = () => {
        debugger
        let state = location.state;
        if(state.data.milestonevalue < amountFunnded || amountFunnded == 0){
            alert("funded amount sholud be less than Requested Draw")
            return 
        }
        state.data.fundedamount = amountFunnded;
        state.data.milestonecomplete = true
        updateDocumnet(state.collectionUrl , state.doc , state.data)
        navigate("/home")
    }

    //on Load
    useEffect(() => {

    }, []);


    return (
        <section className="selectedCurrentRequest">

            <div className="selectedCurrentRequest-header header">
                <h1 style={{ margin: "2.2rem 0 0.5rem 0" }}>
                    RECAP
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

                <div className="row content-center mb-5">
                    <h2>
                        Total Loan
                        <br />
                        <span className="currency-text">${location.state.projectData.totalloanamount}</span>
                    </h2>


                    <br />
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
                    <h2>
                        Eligible draw
                        <br />
                        <span className="currency-text">$100,00</span>
                    </h2>


                    <br />
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
                    <h2>
                        Complete
                        <br />
                        <span className="currency-text">{location.state.projectData.percentage} %</span>
                    </h2>


                    <br />
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
                    <h2>
                        Requested Draw
                        <br />
                        <span className="currency-text">${location.state.data.milestonevalue}</span>
                    </h2>


                    <br />
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
                    <h2>
                        Amount Funded
                        <br />
                        <input className="p-5 content-center" min={0}  type="number" value={amountFunnded}
                            onChange={(e) => setamountFunnded(e.target.value)}
                        />
                    </h2>


                    <br />
                   
                    <button className="submit-recap-btn" onClick={() => submitfund()}>Submit</button>
                    <br />
                </div>








            </div>

        </section >
    );
};

export default Recap;
