import React, { use } from 'react'
import { useEffect } from 'react'
import { fetchTrending } from '../services/api'

const Home = () => {
  
  useEffect(() => {
    fetchTrending('day')
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      })
  }, [])
  
  
  return (
    <div>Home</div>
  )
}

export default Home