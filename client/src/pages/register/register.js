import React, { useState,useEffect } from "react"
import "./register.css"
import { useNavigate} from 'react-router-dom'
import Alert from "../../components/Alert"
import { useAppContext } from "../../context/appContext"

const initialState={
    name: "",
    email:"",
    password:"",
    mobileNumber:"",
    reEnterPassword: "",
    isMember:true,
}
const Register = () => {

    const navigate = useNavigate()

    const [ values, setValues] = useState(initialState)
    const {user,isLoading,showAlert,displayAlert, setupUser}=useAppContext();
   const setUserType=e => {
      console.log(e.target.value);
    }

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
      };
      
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, mobileNumber,isMember } = values;
    console.log("values",values)
    if (!email || !password  ||(isMember && !name )) {
       displayAlert();
      return;
    }
    const currentUser = { name, email, password ,mobileNumber};
    console.log("currentuser",currentUser)
    var isMembers=!isMember
    if (isMembers) {
      console.log("login")
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      });
    } else {
      console.log("register")
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      });
    }
  };

        useEffect(() => {
          if (user) {
            setTimeout(() => {
              navigate('/all-jobs');
            }, 3000);
          }
        }, [user, navigate]);  //every time user and navigate changes

    return (
           <form  onSubmit={onSubmit}>
        <div className="register">
            <h2>{!values.isMember ? 'Login' : 'Register'}</h2>
            {showAlert && <Alert/>}
             {values.isMember && (
            <input type="text" name="name" value={values.name} placeholder="Your Name" onChange={ handleChange }></input> )}
            <input type="text" name="email" value={values.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={values.password} placeholder="Your Password" onChange={ handleChange }></input>
             {values.isMember && (
            <input type="password" name="reEnterPassword" value={values.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>)}
             {values.isMember && (
             <input type="text" pattern="[0-9]*" name="mobileNumber" placeholder="Your mobile number" value={values.mobileNumber} onChange={ handleChange } /> )}
             {values.isMember && (
             <div className="radios" onChange={setUserType.bind(this)}>
                <div className="radio1">
                <input  type="radio" value="Applicant" name="userType"/> Applicant
                </div>
                <div className="radio2">
                <input  type="radio" value="Recruiter" name="userType"/> Recruiter
                </div>
            </div> )}
           {values.isMember ? (
            <div onClick={onSubmit}  disabled={isLoading} className="button" > Register</div> )
            :(
            <div onClick={onSubmit} disabled={isLoading} className="button" >Login</div>
             )}
            <p>
          {!values.isMember ? "Not a member yet?"  : "Already a member?" }
          <button type='button' onClick={toggleMember} className='member-btn'>
            {!values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
        </div>
        </form>

    )
}

export default Register