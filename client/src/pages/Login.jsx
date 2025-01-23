import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const googleLoginURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
      response_type: "id_token",
      client_id:
        "257498817327-5t5f251gccfp98aqv3naqq985rehu0o9.apps.googleusercontent.com",
      // redirect_uri: "http://localhost:5173/start",
      scope: "email profile openid",
      prompt: "select_account",
      nonce: Math.random().toString(36).substring(2, 15),
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    window.location.href = `${googleLoginURL}?${queryString}`;
    navigate("/start");
  };

  return (
    <div className="v9_2">
      <div className="v10_4">
        <span className="v11_2">Smog</span>
        <span className="v11_6">Made with &lt;3 by Susan and Alice</span>
        <div className="v13_24">
          <button onClick={handleLogin} className="google-login-button">
            Sign in with Google
          </button>
        </div>
      </div>
      <div className="v14_11"></div>
      <div className="v11_7"></div>
    </div>
  );
}

export default Login;
