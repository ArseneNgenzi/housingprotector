import React, { useState } from 'react'
import './login.css'
import hplogo from '../../images/hplogo.PNG'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false)


  const displayError = () => {
      setShowError(true)


    // showError = false
  }


  

  const checkCredentials = () => {
    if (
      username === 'housingprotector' &&
      password === 'Housing@1'
    ) {
      localStorage.setItem('emailData', username)
      localStorage.setItem('passwordData', password)
      window.location.reload()
      // setShowDashboard(true);
    } else if (!username || !password || username !== 'housingprotector' || password !== 'Housing@1') {
      displayError()
      setTimeout(() => {
        setShowError(false)
      }, 3000);
    }
  };
  
  return (
    <div className='login-parent'>
      <div className="login-div">
        <div className="inputs">
            <img src={hplogo} alt="logo" />
            <input type="text" placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="submission">
            <button className="login-btn" onClick={checkCredentials}>Login</button>
        </div>
        <div className="error-showing">
          <p className={'error-text' + (showError ? 'redColor' : '')} style={{color: 'red'}}> Authentication Failed! Try Again</p>
        </div>
      </div>
    </div>
  )
}

export default Login