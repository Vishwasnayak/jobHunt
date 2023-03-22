import { useAppContext } from '../../context/appContext';
import { useEffect } from 'react';
import Loading from '../Loading';
import Job from '../Job/Job';
import Alert from '../Alert';
import Wrapper from './JobsContainerCSS';
import PageBtnContainer from '../PageBtnContainer/PageBtnContainer';
 
const JobsContainer = () => {
  const {
    getJobs,jobs,  isLoading, page, totalJobs,  search, searchStatus, searchType, sort, 
     numOfPages, showAlert,
  } = useAppContext();

  useEffect(()=>{  
    getJobs()   //once jobs compoent render get alljobs
  },[page,search, searchStatus, searchType, sort]) //whenever these values changes send a request

  if (isLoading) {  //if we are loading we need to show icon at center
    return <Loading center />;
  }

  if (jobs.length === 0) {   
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>  
      </Wrapper>
    );
  }
  return (
   <Wrapper>
     {showAlert && <Alert />}
      <h3>
        {totalJobs} job{jobs.length > 1 && 's'} found  
      </h3>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
  </Wrapper>
  )
}

export default JobsContainer