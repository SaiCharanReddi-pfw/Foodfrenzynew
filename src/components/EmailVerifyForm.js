import React, { useState } from 'react'
import axios from 'axios';
import { FaExclamationCircle } from 'react-icons/fa'

// Confirmation code verification taking page changing functions and email
function EmailVerifyForm({ SignUp, LogIn, email}) {

  // states to store confirm code and errors in confirm code
  const [confirmCode, setConfirmCode] = useState("")
  const [errors, setErrors] = useState("");

  // form submit handler
  const submitHandler = e =>{
    e.preventDefault();

    const validConfirmCode = new RegExp('^(?=.*?[0-9]).{8,8}$');

    // check for 8 digits in confirm code
    if(validConfirmCode.test(confirmCode)){
      // post request to verify otp of an email
      axios.post('http://localhost:8080/api/verifySignup/user', {
        email: email,
        otp: confirmCode
      })
      .then(function (response) {
        if(response.status===200)
        {
          // Goes to login with alert
          LogIn();
          alert("Email Verified")
        }
        else
        {
          alert("Something went Wrong. Please try Again Later!!")
        }
      })
      .catch(function (_error) {
        alert("Incorrect OTP")
      });
    }
    else{
      // If confirm code doesnot have 8 digits set error
      setErrors(" Enter 8 digits");
      document.getElementById('confirmationCode').style.border = "2px solid #ad2b19"
    }
  }

  return (
    // render email verify for new email
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        {console.log(confirmCode, email)}
        <h2>Enter the code from your mail</h2>
        <div className="form-group">
            Let us know this email belongs to you.
            Enter the code in the email sent.
        </div>
        <div className="form-group">
          <label htmlFor="confirmationCode">Confirmation Code:</label>
          <input id="confirmationCode" type="text" name="confirmationCode"
          // onblur onfocus and onchange handler with OTP
          onBlur={ (e)=>{e.currentTarget.style.border = (errors.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } 
          onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } 
          onChange={e => {setConfirmCode(e.target.value.slice(0,8))}} value={ confirmCode }/>
          <div className='errorText'>
            { (errors.length!==0) && <FaExclamationCircle /> }
            { errors }
          </div>
        </div>
        <input className="verify" type="button" value="Back" onClick={SignUp}/>
        <input className="verify" type="submit" value="Continue" />
      </div>
    </form>
  )
}

export default EmailVerifyForm