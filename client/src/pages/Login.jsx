import React from "react";
import { View, Text } from "react-native-web";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/start");
  };

  return (
    <div className="v9_2">
      <div className="v10_4">
        <span className="v11_2">Smog</span>
        <span className="v11_6">Made with ❤️ by Susan and Alice</span>
        <div className="v11_19">
          <span onClick={handleStartClick} className="v13_23">
            sign in with Google
          </span>
        </div>
        <div className="v13_24"></div>
      </div>
      <div className="v14_11"></div>
      <div className="v11_7"></div>
    </div>
  );
}

export default Login;
