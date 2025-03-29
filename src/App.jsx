import './Css/App.css'
import Favorites from './Pages/Favorites'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom'
import {MovieProvider} from './Context/MovieContext' 
import NavBar from './Components/NavBar'

function App() {
  return (
      <MovieProvider>
        <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </main>
      </MovieProvider>
    )
}


export default App
