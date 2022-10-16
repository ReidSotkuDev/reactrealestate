import React, { useState, useEffect } from "react";
import "./currentRequest.scss";
import { getCollectiondata } from '../../../utilities/firebase-functions'


const SelectedMileStone = ({
  setSelectedMileStoneData,
}) => {

  let showmilestones = [];
  const [milestonesList, setMilestonesList] = useState([]);
 

  useEffect(() => {
    console.log('setSelectedMileStoneData' , setSelectedMileStoneData)
  }, []);
  return (
    <h1>hello</h1>
  );
};

export default SelectedCurrentRequest;
