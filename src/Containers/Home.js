import React from "react";
import NavBar from "../Components/Navbar/NavBar";
import Covid19 from "./Covid19";

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <Covid19 />
    </div>
  );
};

export default Home;
