import React from "react";
import Auth from "../Components/Auth/useAuth";
import Hero from "../Components/Hero/Hero";
import NavBar from "../Components/Navbar/NavBar";

const Home = () => {
  const auth = Auth();
  console.log(auth.currentUser);
  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  );
};

export default Home;
