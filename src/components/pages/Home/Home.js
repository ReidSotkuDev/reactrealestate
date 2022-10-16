import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const tiles = [
    {
      name: "current projects",
      path: "/current-projects",
    },
    {
      name: "project archive",
      path: "/archive-projects",
    },
    {
      name: "current request",
      path: "/current-request",
    },
    {
      name: "users",
      path: "/users",
    },
    {
      name: "logout",
      path: "/logout",
    },
    {
      name: "new project",
      path: "/new-project",
      class: "newProject",
    },
  ];

  return (
    <section className="home">
      <div className="home-header header">
        <h1>Homepage</h1>
      </div>
      <div className="home-tiles">
        {tiles.map((t, idx) => {
          if (!t.class) {
            return (
              <div
                className="home-tiles-tile"
                onClick={() => {
                  console.log(t.name);
                }}
                key={idx}
              >
                <Link to={t.path}>
                  <h2>{t.name}</h2>
                </Link>
              </div>
            );
          } else {
            return (
              <div
                className="home-tiles-tile newProject"
                onClick={() => {
                  console.log(t.name);
                }}
                key={idx}
              >
                <Link to={t.path}>
                  <h2>{t.name}</h2>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default Home;
