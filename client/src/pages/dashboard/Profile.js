import React,{useState} from 'react'
import Alert from "../../components/Alert"
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../components/DashboardFormPage';

const Profile = () => {

  const {user,showAlert,displayAlert,updateUser,isLoading}=useAppContext()

  const [name,setName]=useState(user?.name) //only if there is username init it as or else null
  const [email,setEmail]=useState(user?.email)
  const [mobileNumber,setMobileNumber]=useState(user?.mobileNumber)
  const [location,setLocation]=useState(user?.location)

  const handleSubmit=(e)=>{
      e.preventDefault();
     
      if(!name || !location || !email || !mobileNumber){
        displayAlert()
        return
      }
      updateUser({name,email,location,mobileNumber})
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
      <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            name='mobileNumber'
            placeholder='Mobile Number'
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            type='text'
            name='location'
            value={location}
            placeholder='Location'
           onChange={(e) => setLocation(e.target.value)} 
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile