 import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import Wrapper from './Jobs'
import JobInfo from './JobInfo'


  const Job = ({_id,position,company, jobLocation, jobType, createdAt,  status,
  }) => {
    const { setEditJob, deleteJob } = useAppContext()

  let date = moment(createdAt)  //moment library is used to format
  date = date.format('MMM Do, YYYY')

  return (
   <Wrapper>
    <header>
      <div className="main-icon">{company.charAt(0)}</div>
      <div className="info">
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
      <div className="content">
         <div className="content-center">
          <JobInfo  icon={FaLocationArrow} label="Location : " text={jobLocation}/>
          <JobInfo icon={FaCalendarAlt} label="Date : "text={date}/>
          <JobInfo icon={FaBriefcase} label="Job Type :" text={jobType}/>
          <div className={`status ${status}`}>{status}</div>
         </div>
        <footer>
          <div className="actions">
            <Link to='/add-job' onClick={()=>setEditJob(_id)} className='btn edit-btn'>Edit</Link>
            <button type='button' className='btn delete-btn' onClick={()=>deleteJob(_id)}>Delete</button>
          </div>
        </footer>
      </div>
    </header>
   </Wrapper>
  )
}


export default Job