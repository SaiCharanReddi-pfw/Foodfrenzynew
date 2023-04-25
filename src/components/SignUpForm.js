import React, { useState } from 'react'
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash, FaExclamationCircle } from 'react-icons/fa'
import { IconContext } from "react-icons";

<IconContext.Provider value = {{ className: 'react-icons' }}></IconContext.Provider>

// Sign Up component
function SignUpForm({ EmailVerify, LogIn }) {
  // states for input, error and password field
  const [details, setDetails] = useState({userName: "", email: "", password: "", confirmPassword: ""});
  const [errors, setErrors] = useState({userName: "", email: "", password: "", confirmPassword: ""});
  const [showPassword, setShowPassword] = useState(["password", <FaRegEye />])

  const submitHandler = e => {
    e.preventDefault();

    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const validPassword = new RegExp('^(?=.*?[A-Za-z0-9]).{8,}$');
    const userNameCheck = details.userName.length!==0;
    const emailCheck = validEmail.test(details.email);
    const passwordCheck = validPassword.test(details.password);
    const passwordMatchCheck = details.password === details.confirmPassword;

    // check inputs and edit errors
    if ( !userNameCheck )
    {
      setErrors(prev => ({...prev, userName: ' Enter username'}))
      document.getElementById('userName').style.border = "2px solid #ad2b19"
    }
    else
    {
      setErrors(prev => ({...prev, userName: ''}))
      document.getElementById('userName').style.border = "2px solid #dfe1e5"
    }

    if (!emailCheck )
    {
      setErrors(prev => ({...prev, email: ' Enter valid email'}))
      document.getElementById('email').style.border = "2px solid #ad2b19"
    }
    else
    {
      setErrors(prev => ({...prev, email: ''}))
      document.getElementById('email').style.border = "2px solid #dfe1e5"
    }

    if ( !passwordCheck )
    {
      setErrors(prev => ({...prev, password: ' Use 8 characters or more for your password', confirmPassword: ' Use 8 characters or more for your password'}));
      document.getElementById('password').style.border = "2px solid #ad2b19"
      document.getElementById('confirmPassword').style.border = "2px solid #ad2b19"
    }
    else if( !passwordMatchCheck )
    {
      setErrors(prev => ({...prev, password: ' Those passwords didn’t match. Try again.', confirmPassword: ' Those passwords didn’t match. Try again.'}))
      document.getElementById('password').style.border = "2px solid #ad2b19"
      document.getElementById('confirmPassword').style.border = "2px solid #ad2b19"
    }
    else
    {
      setErrors(prev => ({...prev, password: '', confirmPassword: ''}))
      document.getElementById('password').style.border = "2px solid #dfe1e5"
      document.getElementById('confirmPassword').style.border = "2px solid #dfe1e5"
    }

    if(userNameCheck && emailCheck && passwordCheck && passwordMatchCheck )
    {
      // post request for sign up form
      axios.post('http://localhost:8080/api/signup/user', {
        name: details.userName,
        email: details.email,
        password: details.password
      })
      .then(function (response) {
        if(response.status===200)
        {
          EmailVerify(details.email, "SignUp")
        }
        else
        {
          alert("Something went Wrong. Please try Again Later!!")
        }
      })
      .catch(function (error) {
        console.log(error)
        alert("Something went Wrong. Please try Again Later!!")
      });

    }

  }

  const showPasswordHandler = () => {
    // change password input field
    showPassword[0]==="password"?
    (
      setShowPassword(["text", <FaRegEyeSlash />])
    ):
    (
      setShowPassword(["password", <FaRegEye />])
    )
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Sign up for your account</h2>
        <div className="form-group">
          <label id="userNameLabel" htmlFor="userName">Username:</label>
          <input type="text" name="userName" id="userName" onBlur={ (e)=>{e.currentTarget.style.border = (errors.userName.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } onChange={e => {setDetails({...details, userName: e.target.value.slice(0, 20)})}}  value={details.userName}/>
          <div className='errorText'>
            { (errors.userName.length!==0) && <FaExclamationCircle /> }
            { errors.userName }
          </div>
        </div>
        <div className="form-group">
          <label id="emailLabel" htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onBlur={ (e)=>{e.currentTarget.style.border = (errors.email.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } onChange={e => {setDetails({...details, email: e.target.value})}} value={details.email}/>
          <div className='errorText'>
            { (errors.email.length!==0) && <FaExclamationCircle /> }
            { errors.email }
          </div>
        </div>
        <div className="form-group">
          <label id="passwordLabel" htmlFor="password">Password:</label>
          <input type={showPassword[0]} name="password" id="password" onBlur={ (e)=>{e.currentTarget.style.border = (errors.password.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } onChange={e => {setDetails({...details, password: e.target.value.slice(0, 20)})}} value={details.password}/>
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
          <input type={ showPassword[0] } name="confirmPassword" id="confirmPassword" onBlur={ (e)=>{e.currentTarget.style.border = (errors.confirmPassword.length!==0)? "2px solid #ad2b19": "2px solid #dfe1e5"} } onFocus={ (e)=>{e.currentTarget.style.border = "2px solid #D4B03F"} } onChange={e => {setDetails({...details, confirmPassword: e.target.value.slice(0, 20)})}} value={ details.confirmPassword }/>
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
        <input type="submit" value="Sign Up" />
        <hr className='line'/>
        <div className="text">
          <div className="link" onClick={LogIn}>Return to log in</div>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm