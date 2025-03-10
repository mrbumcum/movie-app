import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchDetails } from '../services/api'
import { useEffect, useState } from 'react'
import { imageBaseUrl } from '../services/api'
import { fetchCredits } from '../services/api'
import { fetchVideos } from '../services/api'


const DetailsPage = () => {
  const { type, id } = useParams();
  const [ details, setDetails ] = useState({});
  const [ credits, setCredits ] = useState({ cast: [] });
  const [ videos, setVideos ] = useState({});

//   useEffect(() => {
//     fetchDetails(type, id)
//     .then((res) => {
//       console.log(res);
//       setDetails(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   }, [type, id])

useEffect(() => {
    const fetchData = async () => {
        try {
            const [detailsData, creditsData, videosData] = await Promise.all([
                fetchDetails(type, id),
                fetchCredits(type, id),
                fetchVideos(type, id)
            ]);

            setDetails(detailsData);
            setCredits(creditsData);
            
            // Find the first trailer
            let mainTrailer = null;
            if (videosData.results && videosData.results.length > 0) {
                // First try to find an official trailer
                mainTrailer = videosData.results.find(
                    video => video.type === "Trailer" && video.official === true
                );
                
                // If no official trailer, get any trailer
                if (!mainTrailer) {
                    mainTrailer = videosData.results.find(video => video.type === "Trailer");
                }
                
                // If still no trailer, just use the first video
                if (!mainTrailer && videosData.results.length > 0) {
                    mainTrailer = videosData.results[0];
                }
            }
            
            setVideos({ ...videosData, mainTrailer });
            console.log(creditsData, 'creditsData');
            console.log(mainTrailer, 'mainTrailer');

        } catch (error) {
            console.log(error, 'error');
        }
    }

    fetchData();
}, [type, id])

useEffect(() => {
  const container = document.querySelector('.cast-scroll-container');
  const leftTrigger = document.querySelector('.scroll-trigger-left');
  const rightTrigger = document.querySelector('.scroll-trigger-right');
  
  if (!container || !leftTrigger || !rightTrigger) return;
  
  const scrollAmount = 300;
  
  leftTrigger.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  
  rightTrigger.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
  
  return () => {
    leftTrigger?.removeEventListener('click', () => {});
    rightTrigger?.removeEventListener('click', () => {});
  };
}, [credits.cast]);


  const title = details?.title || details?.name;
  const overview = details?.overview;
  const releaseDate = details?.release_date || details?.first_air_date;
  const voteAverage = details?.vote_average;

  const trailers = videos.results ? videos.results.filter(video => video.type === "Trailer") : [];

  return (
    <div className="w-screen relative">
      {/* Backdrop image as background */}
      <div className="w-full h-[500px] relative">
        <img 
          src={`${imageBaseUrl}/${details?.backdrop_path}`} 
          className="w-full h-full object-cover opacity-15"
          alt={title}
        />
        
        <div className="absolute inset-0 flex items-center p-8">
          <div className="flex flex-row gap-8 max-w-7xl mx-auto px-15">
            {/* Poster image */}
            <div className="w-64 h-96 flex-shrink-0 shadow-lg">
              <img 
                src={`${imageBaseUrl}/${details?.poster_path}`}
                className="w-full h-full object-cover rounded"
                alt={title}
              />
            </div>
            
            {/* Title and description */}
            <div className="flex flex-col text-white">
              <div className="flex flex-row gap-5 items-center">
                <h1 className="text-4xl font-bold mb-2">{title} {releaseDate && `(${new Date(releaseDate).getFullYear()})`}</h1>
              </div>
              {voteAverage && (
                <div className="flex items-center mb-4 gap-4 py-4">
                  {/* Circular Progress */}
                  <div className="relative size-15 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                      {/* Background Circle */}
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-600" strokeWidth="2"></circle>
                      {/* Progress Circle - Calculate stroke-dashoffset based on vote average */}
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="16" 
                        fill="none" 
                        className="stroke-current text-green-500" 
                        strokeWidth="2" 
                        strokeDasharray="100" 
                        strokeDashoffset={100 - (voteAverage * 10)} 
                        strokeLinecap="round">
                      </circle>
                    </svg>
                    {/* Percentage Text */}
                    <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <span className="text-center text-sm font-bold text-white">{Math.round(voteAverage * 10)}%</span>
                    </div>
                  </div>
                  
                  <span className="mr-2">User Score</span>
                  
                  {/* Watchlist Button */}
                  <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                    + Watchlist
                  </button>
                </div>
              )}
              <p className="text-lg font-bold">Overview</p>
              <p className="text-lg">{overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-15 py-15">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        
        <div className="relative group overflow-hidden">
          {/* Left scroll trigger area */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 cursor-pointer scroll-trigger-left"></div>
          
          {/* Right scroll trigger area */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white/20 to-transparent opacity-0 group-hover:opacity-100 cursor-pointer scroll-trigger-right"></div>
          
          {/* Scrollable container with scroll-smooth */}
          <div className="flex overflow-x-auto scrollbar-hide scroll-smooth cast-scroll-container">
            {credits.cast.map(cast => (
              <div key={cast.id} className="relative group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
                <div className="h-full">
                  {cast.profile_path ? (
                    <img 
                      src={`${imageBaseUrl}/${cast.profile_path}`} 
                      alt={cast.name} 
                      className="w-full h-auto object-cover rounded"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full aspect-[2/3] flex items-center justify-center rounded">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute bottom-0 left-2 right-2 bg-black/50 text-white p-2 rounded-b">
                    <p className="font-bold truncate">{cast.name}</p>
                    <p className="truncate text-xs">{cast.character}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='py-7 px-4'>
            <h2 className="text-2xl font-bold mb-4">Trailer</h2>
            {videos.mainTrailer ? (
                <div className="mx-[5px] aspect-video w-auto">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${videos.mainTrailer.key}`}
                        title={videos.mainTrailer.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p>No trailer available</p>
            )}
        </div>

        <div className='pt-1 px-4'>
          <div className='grid grid-cols-4 gap-4'>
            {videos.results && videos.results
              .filter(video => video.type !== "Trailer") // Get non-trailer videos
              .slice(0, 4) // Limit to only 4 videos
              .map(video => (
                <div key={video.id} className="aspect-video w-full">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${video.key}`}    
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsPage