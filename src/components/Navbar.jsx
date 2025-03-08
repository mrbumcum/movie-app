import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold uppercase text-red-600 tracking-wider">CineStream</div>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/movies" className="hover:text-orange-500">Movies</Link>
          <Link to="/tvshows" className="hover:text-orange-500">TV Shows</Link>
          <Link to="/search" >Search</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar