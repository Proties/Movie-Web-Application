import './Css/App.css'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import MovieDetails from './Pages/MovieDetails';
import {Routes, Route} from 'react-router-dom'
import {MovieProvider} from './context/MovieContext' 
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

function App() {
  return (
      <MovieProvider>
        <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
      </MovieProvider>
    )
}


export default App
