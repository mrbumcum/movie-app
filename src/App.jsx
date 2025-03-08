import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Search from './pages/Search'
function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
