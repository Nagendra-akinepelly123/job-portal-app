import React from "react";
import "../styles/Homepage.css";

function Homepage() {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/bg.mp4" type="video/mp4"></source>
      </video>
    </>
  );
}

export default Homepage;
