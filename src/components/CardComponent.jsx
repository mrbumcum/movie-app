import React from 'react'
import { Link } from 'react-router-dom'
import { imageBaseUrl } from '../services/api'

const CardComponent = ({item}) => {
  return (
    <Link to="/">
      <div className="relative group transform transition-transform duration-300 hover:scale-[1.08]">
        <img src={`${imageBaseUrl}/${item?.poster_path}`} className="w-full h-full object-cover" alt={item.title} />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-24 flex flex-col items-center">
          <p className="p-1 truncate">
            {item.title || item.name}
          </p>
          <p className="truncate text-xs">
            {(item.release_date || item.first_air_date)?.slice(0, 4)}
          </p>
          <div className="flex items-center justify-center">
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24px"
              height="24px"
            >
              <path
                fill="#FFFFFF"
                d="M394 480a16 16 0 0 1-9.39-3L256 383.76L127.39 477a16 16 0 0 1-24.55-18.08L153 310.35L23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480"
              />
            </svg>
            <p className="p-2 truncate">
              {item.vote_average}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardComponent