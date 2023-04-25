import React from 'react'
import axios from 'axios';

function ShowSurvey({Product, name, email}) {
    const putSurvey = ()=> {
        // post request for survey data with email
        axios.post('http://localhost:8080/api/survey/', {
        age: document.getElementById("age").value,
        college: document.getElementById("college").value,
        ethnicity: document.getElementById("ethnicity").value,
        experience: document.getElementById("experience").value,
        location: document.getElementById("location").value,
        members: document.getElementById("members").value,
        email: email
        })
        .then(function (response) {
            if(response.status===200)
            {
                Product(name, email)
                alert("Thank you for filling out the Survey")
            }
            else
            {
            alert("Something went Wrong. Please try Again!!")
            }
        })
        .catch(function (error) {
            console.log(error)
            alert("Invalid email or password")
        })
    }

  return (
    <div style={{textAlign: "center", backgroundColor: "#F4EBD0", padding: "217px"}}>
        <h1>SURVEY</h1>
        <br />
        <br />
        What is your Age?
        <select name="age" id="age">
            <option value="0-18">0-18</option>
            <option value="19-59">19-59</option>
            <option value="60+">60+</option>
        </select>
        <br />
        <br />
        Which college you are studying in?
        <select name="college" id="college">
            <option value="PFW">PFW</option>
            <option value="IU">IU</option>
            <option value="Others">Others</option>
        </select>
        <br />
        <br />
        Describe your Ethnic Background?
        <select name="ethnicity" id="ethnicity">
            <option value="White">White</option>
            <option value="Black or African American">Black or African American</option>
            <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
            <option value="Asian">Asian</option>
            <option value="Hispanic or Latino">Hispanic or Latino</option>
            <option value="Other">Other</option>
        </select>
        <br />
        <br />
        How was your Experience?
        <select name="experience" id="experience">
            <option value="Below Average">Below Average</option>
            <option value="Average">Average</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
        </select>
        <br />
        <br />
        Which Location you used for Pantry?
        <select name="location" id="location">
            <option value="Walb Student Union">Walb Student Union</option>
            <option value="Student Housing">Student Housing</option>
        </select>
        <br />
        <br />
        How many members you are living with?
        <select name="members" id="members">
            <option value="1">1</option>
            <option value="2-3">2-3</option>
            <option value="4+">4+</option>
        </select>
        <br />
        <div>
            <input type="button" value="Submit" style={{width:"100px"}} onClick={putSurvey} />
        </div>
    </div>
  )
}

export default ShowSurvey