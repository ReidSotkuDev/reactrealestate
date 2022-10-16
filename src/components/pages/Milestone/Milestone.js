import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homePNG from "../../../assets/images/home.png";
import "./milestone.scss";
import MilestoneValue from "./MilestoneValue";

const Milestone = () => {
  const [milestoneValueView, setMilestoneValueView] = useState(false);
  const [selectAll, setSelectAll] = useState("");
  const defineSelectors = [
    {
      name: "Rough Grade",
    },
    {
      name: "Roof Deck",
    },
    {
      name: "Insulation And Sheet Rock",
    },
    {
      name: "Concrete Walks & Porches",
    },
    {
      name: "Footings",
    },
    {
      name: "Roofing",
    },
    {
      name: "Garage Door",
    },
    {
      name: "Interior Paint",
    },
    {
      name: "Plumbing Rough In",
    },
    {
      name: "Windows",
    },
    {
      name: "Cabinets, trim & millwork materials",
    },
    {
      name: "Exterior Paint",
    },
    {
      name: "Back Fill",
    },
    {
      name: "Top-out plumbing",
    },
    {
      name: "Cabinets, trim & millwork labor",
    },
    {
      name: "Light Fixtures / Final Elecrtric",
    },
    {
      name: "Slab",
    },
    {
      name: "Rough-Heat/Air",
    },
    {
      name: "Flooring - concrete stain - tile/wood",
    },
    {
      name: "Countertops",
    },
    {
      name: "Framing",
    },
    {
      name: "Furnace Set",
    },
    {
      name: "Exterior Venner",
    },
    {
      name: "Appliances",
    },
    {
      name: "Sheathead",
    },
    {
      name: "Electric Rough-In",
    },
    {
      name: "Driveway",
    },
    {
      name: "Final Plumbing",
    },
    {
      name: "Hardware",
    },
    {
      name: "Wood Floor Finish, Concrete Stain & Carpe",
    },
    {
      name: "Ac Compressor",
    },
    {
      name: "Final Grade / Landscape / Sod",
    },
  ];
  const [selectedSelectors, setSelectedSelectors] = useState([]);

  useEffect(() => {
    const selectorsCheckboxes = document.querySelectorAll(
      "#selectors-checkbox"
    );
    if (selectAll === true) {
      selectorsCheckboxes.forEach((s) => {
        if (!s.checked) {
          s.click();
        }
      });
      setSelectedSelectors(
        defineSelectors.map((s, idx) => {
          return { ...s, id: idx, value: 0 };
        })
      );
      // eslint-disable-next-line array-callback-return
      //   selectorsCheckboxes.map((selector) => {
      //     selector.click();
      //   });
      //   setSelectedSelectors(defineSelectors);
    }
    if (selectAll === false) {
      selectorsCheckboxes.forEach((s) => {
        if (s.checked) {
          s.click();
        }
      });
      setSelectedSelectors([]);
    }
  }, [selectAll]);
  console.log("list----", selectedSelectors);

  return !milestoneValueView ? (
    <>
      <section className="milestone">
        <div className="milestone-header header">
          <h1>SELECT YOUR MILESTONE</h1>
        </div>
        <form>
          <div className="milestone-selectors flex flex-ai-c flex-jc-c flex-d-c">
            <div className="milestone-selectors-selectAll flex flex-ai-c">
              <input
                type="checkbox"
                name="selectAll"
                onClick={(event) => {
                  if (event.target.checked) {
                    setSelectAll(true);
                  } else {
                    setSelectAll(false);
                  }
                }}
              ></input>
              <label for="selectAll">Select All</label>
            </div>
            <div className="milestone-selectors-selectIndividual flex flex-jc-sa">
              {defineSelectors.map((s, idx) => {
                return (
                  <div
                    className="flex flex-ai-c"
                    key={idx}
                    style={{ flex: "1", minWidth: "25%", marginBottom: "25px" }}
                  >
                    <input
                      id="selectors-checkbox"
                      type="checkbox"
                      name={s.name}
                      onClick={(event) => {
                        if (event.target.checked) {
                          setSelectedSelectors([
                            ...selectedSelectors,
                            { ...s, id: idx, value: 0 },
                          ]);
                        }
                        if (!event.target.checked) {
                          setSelectedSelectors(
                            selectedSelectors.filter((s) => {
                              return idx !== s.id;
                            })
                          );
                        }
                      }}
                    ></input>
                    <label for={s.name}>{s.name}</label>
                  </div>
                );
              })}
            </div>
            <button
              className="milestone-selectors-submitBtn"
              onClick={(event) => {
                event.preventDefault();
                setMilestoneValueView(true);
              }}
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
    </>
  ) : (
    <>
      <MilestoneValue
        selectedSelectors={selectedSelectors}
        setSelectedSelectors={setSelectedSelectors}
      />
    </>
  );
};

export default Milestone;
