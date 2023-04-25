import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import EmailVerifyForm from "./components/EmailVerifyForm";
import LoginForm from "./components/LoginForm";
import ShowHomePage from "./components/ShowHomePage";
import ShowProduct from "./components/ShowProduct";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordOTPForm from "./components/ForgotPasswordOTPForm";
import ShowSurvey from "./components/ShowSurvey";

function App() {
  // states for page, image show, email, username and style
  const [page, setPage] = useState("HomePage");
  const [showImage, setShowImage] = useState(false)
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("")
  const [appStyle, setAppStyle] = useState({alignItems: "", justifyContent: "", display: ""})

  // Page functions
  const EmailVerify = (data) => {
    setShowImage(true)
    ChangeStyle("center", "center", "flex")
    setEmail(() => (data));
    setPage("EmailVerify");
  }

  const LogIn = () => {
    setShowImage(true)
    ChangeStyle("center", "center", "flex")
    setPage("LogIn")
  }

  const SignUp = () =>{
    setShowImage(true)
    ChangeStyle("center", "center", "flex")
    setPage("SignUp")
  }

  const Product = (name, email_value) =>{
    setShowImage(false)
    ChangeStyle("", "", "")
    setUserName(() => (name))
    setEmail(() => (email_value))
    setPage("Product")
  }

  const ForgotPassword = () =>{
    setShowImage(true)
    ChangeStyle("center", "center", "flex")
    setPage("ForgotPassword")
  }

  const ForgotPasswordOTP = (data) =>{
    setShowImage(true)
    ChangeStyle("center", "center", "flex")
    setEmail(() => (data));
    setPage("ForgotPasswordOTP")
  }

  const Survey = (name, email_value) =>{
    ChangeStyle("", "", "")
    setUserName(() => (name))
    setEmail(() => (email_value))
    setPage("Survey")
  }

  const HomePage = () =>{
    setShowImage(false)
    ChangeStyle("", "", "")
    setPage("HomePage")
  }

  // Style change
  const ChangeStyle = (align, justify, displ) =>{
    setAppStyle({alignItems: align, justifyContent: justify, display: displ})
  }

  const Page = () =>{
    // render pages
    switch (page){
      case "SignUp":
        return <SignUpForm EmailVerify={EmailVerify} LogIn={LogIn}/>
      case "EmailVerify":
        return <EmailVerifyForm SignUp={SignUp} LogIn={LogIn} email={email} />
      case "LogIn":
        return <LoginForm SignUp={SignUp} Product={Product} ForgotPassword={ForgotPassword} />
      case "Product":
        return <ShowProduct LogIn={LogIn} userName={userName} email={email} Survey={Survey} />
      case "ForgotPassword":
        return <ForgotPasswordForm LogIn={LogIn} ForgotPasswordOTP={ForgotPasswordOTP} />
      case "ForgotPasswordOTP":
        return <ForgotPasswordOTPForm LogIn={LogIn} ForgotPassword={ForgotPassword} email={email} />
      case "HomePage":
        return <ShowHomePage LogIn={LogIn} SignUp={SignUp} />
      case "Survey":
        return <ShowSurvey Product={Product} name={userName} email={email} />
      default:
        console.log("Error")
    }
  }

  return (
    // Main app renders
    <div className="App" style={appStyle}>
      {Page()}
      {showImage && <img src="PantryLogo.jpg" alt="No Image" onClick={HomePage} />}
    </div>
  )
}

export default App;
