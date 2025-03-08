import axios from 'axios';

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING API ROUTE
export const fetchTrending = async (timeWindow = 'day') => {
    const res = await axios.get(
        `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    );

    return res.data.results;
}