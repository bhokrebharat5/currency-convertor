
import React from 'react'
import { Outlet } from 'react-router'
import Headers from './headers/Header'
import Footers from './footers/Footer'

const Layout: React.FC = () => {
  return (
    <>
      <Headers />
        <Outlet />
      <Footers />
    </>
  )
}

export default Layout