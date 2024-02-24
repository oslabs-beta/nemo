import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [text, setText] = useState("Welcome to Nemo!");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // After component mounts, set showText to true to trigger animation
    setShowText(true);
  }, []);

  return (
    <div style={{
      color: "#E88504",
      display: "flex",
      justifyContent: "center",  // Horizontal centering
      alignItems: "center",      // Vertical centering
      height: "100vh",           // Full viewport height
      fontSize: "3rem",          // Bigger text size
      opacity: showText ? 1 : 0, // Set opacity based on showText state
      transition: "opacity 3s ease", // Smooth transition for opacity change
      marginLeft: "150px",        // Set left margin to auto to push text to the right
    }}>
      {text}
    </div>
  );
};

export default Welcome;


