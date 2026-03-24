import React, { useState } from 'react'
import {Link} from 'react-router';
import "../styles/form.scss";
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault();
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter Username' />
          <input onInput={(e)=>{setEmail(e.target.value)}} type="email" name='email' placeholder='Enter Email' />
          <input onInput={(e)=>{setPassword(e.target.value)}} type="text" name='password' placeholder='Enter Password' />
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleauthform' to='/login'>Login</Link> </p>
      </div>
    </main>
  )
}

export default Register