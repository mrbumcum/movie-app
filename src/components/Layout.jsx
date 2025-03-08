import React from 'react'

const Layout = ({ children}) => {
  return (
    <div className="min-h-screen bg-black text-white">
        {children}
    </div>
  )
}

export default Layout