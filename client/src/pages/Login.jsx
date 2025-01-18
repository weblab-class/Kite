import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/start');
  };

  return (
    <div className="v9_2">
      <div className="v10_4">
        <span className="v11_2">Smog</span>
        <span className="v11_6">Made with &lt;3 by Susan and Alice</span>
        <div className="v13_24">
        <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log('Login Failed')}
          /> 
        </div>
      </div>
      <div className="v14_11"></div>
      <div className="v11_7"></div>
    </div>
  );
}

export default Login;
