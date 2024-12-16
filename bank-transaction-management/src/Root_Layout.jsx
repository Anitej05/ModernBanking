import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
function Root_Layout() {
  return (
    <div>
        <Header />
        <div style={{
            minHeight: '90vh',  // Ensure content area doesn't overlap with footer
            padding: '20px',
            backgroundColor: "#b3e0ff",  // Light blue background for the content area
            display: 'flex', 
            justifyContent: 'center' // Center content horizontally (for your contacts list)
        }}>
            <Outlet/>
        </div>
        <Footer />
    </div>
  )
}

export default Root_Layout