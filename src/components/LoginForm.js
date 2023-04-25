import React, { useState } from 'react'
import axios from 'axios'
import { FaRegEye, FaRegEyeSlash, FaExclamationCircle } from 'react-icons/fa'
import { IconContext } from "react-icons"

<IconContext.Provider value = {{ className: 'react-icons' }}></IconContext.Provider>

// Login form with 3 page functions
function LoginForm({ SignUp, Product, ForgotPassword }) {
  // States for inputs and errors
  const [details, setDetails] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({email: "", password: ""});
  const [showPassword, setShowPassword] = useState(["password", <FaRegEye />])

  const submitHandler = e => {
    e.preventDefault()

    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    const validPassword = new RegExp('^(?=.*?[A-Za-z0-9]).{8,}$')
    const emailCheck = validEmail.test(details.email)
    const passwordCheck = validPassword.test(details.password)

    // Checks for errors in input and show error
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
    }
    else
    {
      setErrors(prev => ({...prev, password: '', confirmPassword: ''}))
      document.getElementById('password').style.border = "2px solid #dfe1e5"
    }

    if(emailCheck && passwordCheck)
    {
      // POST request to check email and password
      axios.post('http://localhost:8080/api/login/user', {
        email: details.email,
        password: details.password
      })
      .then(function (response) {
        if(response.status===200)
        {
          Product(response.data.user_profile_details.name, response.data.user_profile_details.email);
        }
        else
        {
          alert("Something went Wrong. Please try Again!!")
        }
      })
      .catch(function (error) {
        console.log(error)
        alert("Invalid email or password")
      });
    }

  }

  const showPasswordHandler = () => {
    // Password input change based on icon
    showPassword[0]==="password"?
    (
      setShowPassword(["text", <FaRegEyeSlash />])
    ):
    (
      setShowPassword(["password", <FaRegEye />])
    )
  }

  return (
    // Render login form with email and password input with forgot password and sign up page change
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Log in to your account</h2>
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
        <input type="submit" value="Log In" />
        <hr className='line'/>
        <div className="text">
          <div className="link" onClick={ForgotPassword}>Forgot password</div>
          <div className="link" onClick={SignUp}>Sign up for an account</div>
        </div>
      </div>
    </form>
  )
}

export default LoginForm