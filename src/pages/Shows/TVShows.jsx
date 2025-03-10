import React, { useState, useEffect } from 'react'
import { fetchPopular } from '../../services/api';
import CardComponent from '../../components/CardComponent';

const TVShows = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPopular('tv')
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err, "err");
    })}, [])
  
    return (
      <div className="container mx-auto px-15">
        <div className="flex items-center">
          <h2 className="text-xl font-bold my-6 md:my-8 lg:my-10">Trending</h2>
          <div className="flex outline-solid rounded-xl mx-4 my-1">
            <button className="px-3 py-1 rounded-lg hover:bg-blue-500/40">Today</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data && data.map((item) => (
            <div key={item.id}>
              <CardComponent item={item} />
            </div>
          ))}
        </div>
      </div>
    )
  }


export default TVShows