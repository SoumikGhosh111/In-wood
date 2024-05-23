import React from 'react'; 
import UserRegister from '../LoginComponent/UserRegister/UserRegister';
import Login from '../LoginComponent/Login/Login';

function LoginPage() {
  return (
    <div style={{overflow: 'hidden', height: '100vh'}}>
      {/* <UserRegister /> */}
      <Login />
    </div>
  )
}

export default LoginPage