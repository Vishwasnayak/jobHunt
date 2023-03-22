import logo from '../../assets/images/logo.png'
import home from '../../assets/images/jobs.jpeg'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { Link } from 'react-router-dom'
import './landing.css'
import data from '../../data/landing.json';

const Landing =() =>{
    const { user } = useAppContext();
    return(
       
        <>
         {user && <Navigate to='/' />}
      <div className='header'>
      <div className="logo">
         <img src={logo} alt="jobhunt" width={165} height={155}  />
      </div>
  {/* <div className="btn-try"> */}
  <div className=' btn-try registers'>
  <Link to='/register' > 
  <button className='btn-try button'> Register </button></Link>
  </div>
 
  </div>
    <div className="hero-section">
            <div className="container-hero">
                <div className="content-hero">
                    <div className="left-side">
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                        <form>
                            <div className="form-group">
                               <Link to='/register' > 
                                <input type="email" placeholder="Name@company.com" />
                                <button type="submit" >Search Jobs</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="right-side">
                        <img src={home} alt="home" layout="fill" height={400} />
                    </div>
                </div>
            </div>
        </div>
 </>
)}


export default Landing;