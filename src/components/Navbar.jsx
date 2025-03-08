import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold uppercase text-red-600 tracking-wider">CineStream</div>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/movies" className="hover:text-orange-500">Movies</Link>
          <Link to="/tvshows" className="hover:text-orange-500">TV Shows</Link>
          <Link to="/search" className="flex items-center hover:text-orange-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              width="24" 
              height="24" 
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar