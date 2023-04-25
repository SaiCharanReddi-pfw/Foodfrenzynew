import React, { useState } from 'react'
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash, FaExclamationCircle } from 'react-icons/fa'
import { IconContext } from "react-icons";

<IconContext.Provider value = {{ className: 'react-icons' }}></IconContext.Provider>

// Forgot password OTP taking two page change functions and email
function ForgotPasswordOTPForm({ LogIn, ForgotPassword, email }) {
    // Declare states with password input
    const [details, setDetails] = useState({confirmCode: "",password: "", confirmPassword: ""});
    const [errors, setErrors] = useState({confirmCode: "",password: "", confirmPassword: ""});
    const [showPassword, setShowPassword] = useState(["password", <FaRegEye />])

    const submitHandler = e => {
        e.preventDefault();

        // Check for valid inputs in form
        const validConfirmCode = new RegExp('^(?=.*?[0-9]).{8,8}$');  
        const validPassword = new RegExp('^(?=.*?[A-Za-z0-9]).{8,}$');
        const confirmCodeCheck = validConfirmCode.test(details.confirmCode);
        const passwordCheck = validPassword.test(details.password);
        const passwordMatchCheck = details.password === details.confirmPassword;

        // Put and remove errors based on checks
        if (!confirmCodeCheck )
        {
          setErrors(prev => ({...prev, confirmCode: ' Enter 8 digits'}))
          document.getElementById('confirmCode').style.border = "2px solid #ad2b19"
        }
        else
        {
          setErrors(prev => ({...prev, confirmCode: ''}))
          document.getElementById('confirmCode').style.border = "2px solid #dfe1e5"
        }
    
        if ( !passwordCheck )
        {
          setErrors(prev => ({...prev, password: ' Use 8 characters or more for your password', 
          confirmPassword: ' Use 8 characters or more for your password'}));
          document.getElementById('password').style.border = "2px solid #ad2b19"
          document.getElementById('confirmPassword').style.border = "2px solid #ad2b19"
        }
        else if( !passwordMatchCheck )
        {
          setErrors(prev => ({...prev, password: ' Those passwords didn’t match. Try again.', 
          confirmPassword: ' Those passwords didn’t match. Try again.'}))
          document.getElementById('password').style.border = "2px solid #ad2b19"
          document.getElementById('confirmPassword').style.border = "2px solid #ad2b19"
        }
        else
        {
          setErrors(prev => ({...prev, password: '', confirmPassword: ''}))
          document.getElementById('password').style.border = "2px solid #dfe1e5"
          document.getElementById('confirmPassword').style.border = "2px solid #dfe1e5"
        }
    
        if( confirmCodeCheck && passwordCheck && passwordMatchCheck )
        {
          // POST request to check OTP and edit password
          axios.post('http://localhost:8080/api/verify/user', {
            email: email,
            forgot_otp: details.confirmCode,
            password: details.password
          })
          .then(function (response) {
            if(response.status===200)
            {
                LogIn();
                alert("Password Changed")
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
      }

      const showPasswordHandler = () => {
        // Change password format and eye icon based on click in the icon
        showPassword[0]==="password"?(
          setShowPassword(["text", <FaRegEyeSlash />])
        ):(
          setShowPassword(["password", <FaRegEye />])
        )
      }

    return (
      // Render forgotpassword OTP form with back and submit button
    <form onSubmit={submitHandler}>
        <div className="form-inner">
            <h2>Change your password</h2>
            <div className="form-group">
            <label htmlFor="confirmCode">Confirmation Code:</label>
            <input id="confirmCode" type="text" name="confirmCode" 
            onBlur={ (e)=>{e.currentTarget.style.border = (errors.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } 
            onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } 
            onChange={e => {setDetails({...details, confirmCode: e.target.value.slice(0, 8)})}} 
            value={ details.confirmCode }/>
              <div className='errorText'>
                  { (errors.confirmCode.length!==0) && <FaExclamationCircle /> }
                  { errors.confirmCode }
              </div>
            </div>
        <div className="form-group">
            <label id="passwordLabel" htmlFor="password">Password:</label>
            <input type={showPassword[0]} name="password" id="password" 
            onBlur={ (e)=>{e.currentTarget.style.border = (errors.password.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } 
            onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } 
            onChange={e => {setDetails({...details, password: e.target.value.slice(0, 20)})}} 
            value={ details.password }/>
            <div>
                <div onClick={showPasswordHandler}>
                <IconContext.Provider value={{ className: 'react-icons' }}>
                    {showPassword[1]}
                </IconContext.Provider>
                </div>
            </div>
          <div className='errorText'>
            { (errors.password.length!==0) && <FaExclamationCircle /> }
            { errors.password }
          </div>
        </div>
        <div className="form-group">
          <label id="confirmPasswordLabel" htmlFor="password">Confirm Password:</label>
          <input type={ showPassword[0] } name="confirmPassword" id="confirmPassword" 
          onBlur={ (e)=>{e.currentTarget.style.border = (errors.confirmPassword.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } 
          onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } 
          onChange={e => {setDetails({...details, confirmPassword: e.target.value.slice(0, 20)})}} 
          value={ details.confirmPassword }/>
          <div>
            <div onClick={showPasswordHandler}>
              <IconContext.Provider value={{ className: 'react-icons'}}>
                { showPassword[1] }
              </IconContext.Provider>
            </div>
          </div>
          <div className='errorText'>
            { (errors.confirmPassword.length!==0) && <FaExclamationCircle /> }
            { errors.confirmPassword }
          </div>
        </div>
        <input className="verify" type="button" value="Back" onClick={ForgotPassword}/>
        <input className="verify" type="submit" value="Change Password" />
      </div>
    </form>
    )
}

export default ForgotPasswordOTPForm