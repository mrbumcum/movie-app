import React, { useState, useEffect } from 'react'
import { fetchTrending } from '../services/api'
import CardComponent from '../components/CardComponent'

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
       }).finally(() => {
        setLoading(false);
       })
  }, [timeWindow])
  
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center">
        <h2 className="text-xl font-bold my-6 md:my-8 lg:my-10">Trending</h2>
        <div className="flex outline-solid rounded-xl mx-4 my-1">
          <button className="px-3 py-1 rounded-lg hover:bg-blue-500/40" onClick={() => setTimeWindow('day')}>Today</button>
          <button className="px-3 py-1 rounded-lg hover:bg-blue-500/40" onClick={() => setTimeWindow('week')}>This Week</button>
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

export default Home