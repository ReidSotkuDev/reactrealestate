import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./milestone.scss";

const MilestoneValue = ({ selectedSelectors }) => {
  const [totalValue, setTotalValue] = useState(0);
  const [selectedSelectorsWithValue, setSelectedSelectorsWithValue] =
    useState(selectedSelectors);

  useEffect(() => {
    calculateTotalValue(selectedSelectorsWithValue);
  }, [selectedSelectorsWithValue]);

  const calculateTotalValue = (selectedSelectorsWithValue) => {
    let total = 0;
    selectedSelectorsWithValue.forEach((selector) => {
      if (selector.value) {
        total = Number(total) + Number(selector.value);
      }
    });
    setTotalValue(total);
  };

  const updateValueForSelectedSelector = (event, selector) => {
    const updatedSelectors = selectedSelectorsWithValue.map((s) => {
      if (s.id === selector.id) {
        return { ...s, value: Number(event.target.value) };
      } else {
        return { ...s };
      }
    });
    setSelectedSelectorsWithValue(updatedSelectors);
  };

  return (
    <section className="milestoneValue">
      <div className="milestoneValue-header header">
        <h1 style={{ margin: "2rem 0 0 0" }}>MILESTONE VALUE(%)</h1>
        <p style={{ textAlign: "center", fontSize: "2rem" }}>
          Use Suggegsted Amounts
        </p>
      </div>
      <form>
        <div className="milestone-selectors flex flex-ai-c flex-jc-c flex-d-c">
          <div className="milestone-selectors-selectAll flex flex-ai-c"></div>
          <div className="milestone-selectors-selectIndividual flex flex-jc-sa">
            {selectedSelectors.map((s, idx) => {
              return (
                <div
                  className="flex flex-ai-c"
                  key={idx}
                  style={{ flex: "1", minWidth: "25%", marginBottom: "25px" }}
                >
                  <input
                    id="selectors-checkbox"
                    type="number"
                    name={s.name}
                    style={{
                      width: "6rem",
                      padding: "1rem 0 1rem 0.8rem",
                      fontSize: "1.5rem",
                    }}
                    placeholder="%"
                    onChange={(event) => {
                      updateValueForSelectedSelector(event, s);
                    }}
                  ></input>
                  <label for={s.name}>{s.name}</label>
                </div>
              );
            })}
          </div>
          <div className="milestoneValue-total">
            <h1>
              Total Value
              <br />
              (must = 100%)
            </h1>
            <hr style={{ margin: "1rem 0" }} />
            <h2>{totalValue}</h2>
          </div>
          <button
            className="milestone-selectors-submitBtn"
            //   onClick={(event) => {
            //     event.preventDefault();
            //     setMilestoneValueView(true);
            //   }}
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="homeBtn">
        <Link to="/home">
          <img src={homePNG} alt="home"></img>
        </Link>
      </div>
    </section>
  );
};

export default MilestoneValue;
