import { useAppContext } from '../../context/appContext'
import NavLinks from '../NavLinks'
import Logo from '../Logo'
import Wrapper from '../BigSidebar/BigSideBars'

const BigSidebar = () => {
  const { showSidebar,toggleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
