import React from 'react';

import { useNavigate } from 'react-router-dom';

 

const LoginPage = ({ setIsAuthenticated }) => {

  const navigate = useNavigate();

 

  const handleLogin = () => {

    // Aquí iría tu lógica de autenticación

    setIsAuthenticated(true);

    navigate('/dashboard');

  };

 

  return (

    <div>

      <h2>Login Page</h2>

      <button onClick={handleLogin}>Login</button>

    </div>

  );

};
export default LoginPage;