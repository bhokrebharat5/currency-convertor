import { Outlet } from 'react-router'
import Header from './headers/Header'
import Footer from './footers/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
