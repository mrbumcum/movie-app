import axios from 'axios';

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

// TRENDING API ROUTE
export const fetchTrending = async (timeWindow = 'day') => {
    const res = await axios.get(
        `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    );

    return res.data.results;
}


// TV SHOWS API ROUTE
export const fetchDetails = async (type, id) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}?api_key=${apiKey}`
    )    

    return res.data;
}

// Movies & Series - CREDITS API ROUTE
export const fetchCredits = async (type, id) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
    )

    return res.data;
}

// Movies & Series - VIDEOS API ROUTE
export const fetchVideos = async (type, id) => {
    const res = await axios.get(
        `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
    )
    
    return res.data;
}


// POPULAR API ROUTE
export const fetchPopular = async (type) => {
    const res = await axios.get(
        `${baseUrl}/${type}/popular?api_key=${apiKey}`
    )

    return res.data.results;
}

