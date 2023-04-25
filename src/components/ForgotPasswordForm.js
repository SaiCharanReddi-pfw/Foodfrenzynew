import React, { useState } from 'react'
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa'
import { IconContext } from "react-icons";

<IconContext.Provider value = {{ className: 'react-icons' }}></IconContext.Provider>

function ForgotPasswordForm({ LogIn, ForgotPasswordOTP }) {
  // states for email value and error
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const submitHandler = e => {
    e.preventDefault();

    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    // check valid email and set errors
    const emailCheck = validEmail.test(email);
    if (!emailCheck )
    {
      setErrors(' Enter valid email')
      document.getElementById('email').style.border = "2px solid #ad2b19"
    }
    else
    {
      setErrors('')
      document.getElementById('email').style.border = "2px solid #dfe1e5"
    }

    if(emailCheck)
    {
      // post request to verify email
      axios.post('http://localhost:8080/api/forgot/user', {
        email: email,
      })
      .then(function (response) {
        if(response.status===200)
        {
          // go to OTP page for sucessful submit
          ForgotPasswordOTP(email)
        }
        else
        {
          alert("Something went Wrong. Please try Again Later!!")
        }
      })
      .catch(function (_error) {
        alert("Incorrect Email")
      });
    }

  }

  return (
    // render form having email input with submit and back button
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Password recovery</h2>
        <div className="form-group">
          <label id="emailLabel" htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" 
          onBlur={ (e)=>{e.currentTarget.style.border = (errors.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } 
          onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } 
          onChange={e => {setEmail(e.target.value)}} value={email}/>
          <div className='errorText'>
            { (errors.length!==0) && <FaExclamationCircle /> }
            { errors }
          </div>
        </div>
        <input className="verify" type="button" value="Back" onClick={ LogIn } />
        <input type="submit" value="Submit" onClick={ submitHandler } />
      </div>
    </form>
  )
}

export default ForgotPasswordForm