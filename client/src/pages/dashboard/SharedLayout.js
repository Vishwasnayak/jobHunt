import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import Wrapper from '../../components/SharedLayoutComp'
import Navbar  from '../../components/Navbar/Navbar'
import BigSideBar from "../../components/BigSidebar/BigSidebar"
import SmallSidebar from "../../components/SmallSidebar/SmallSidebar";

const SharedLayout = () => {
  return (
    <Wrapper>
        <main className='dashboard'>
          <SmallSidebar/>
          <BigSideBar/>
          <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet/>
          </div>
          </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout