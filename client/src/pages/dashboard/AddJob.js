import Alert  from '../../components/Alert'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../components/DashboardFormPage'
import FormRowSelect from '../../components/FormRowSelect';

 const AddJob = () => {

  const {
    isLoading,  isEditing,showAlert,displayAlert, position, company, jobLocation, jobType,
    jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob, editJob,
  } = useAppContext();

  const handleJobInput=(e)=>{
     const name=e.target.name
     const value=e.target.value
     handleChange({name,value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?"Edit Job":"Add Job"}</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
         {/* position */}
         <input
            type='text'
            name='position'
            placeholder="Add Position"
            value={position}
            onChange={handleJobInput}
          />
          {/* company */}
          <input
            type='text'
            name='company'
            placeholder="Company name"
            value={company}
            onChange={handleJobInput}
          />
          {/* location */}
          <input
            type='text'
            labelText='Job location'
            placeholder="Job location"
            name='jobLocation'
            value={jobLocation}
            onChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              Clear
            </button>
          </div>
        </div>
       
      </form>
    </Wrapper>
  )
}

export default AddJob