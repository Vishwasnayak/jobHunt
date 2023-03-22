import Wrapper from './JobInfos'

const JobInfo = ({ icon, text, label }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'><b>{label}</b> {text}</span>
    </Wrapper>
  )
}

export default JobInfo