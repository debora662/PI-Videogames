import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import CreateVideogame from './components/CreateVideogame/CreateVideogame'
import Nav from './components/Nav/Nav'
import axios from 'axios'
axios.defaults.baseURL = 'https://pi-videogames-production-3e03.up.railway.app/'

function App () {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/newVideogame' element={<CreateVideogame />} />
      </Routes>
    </div>
  )
}

export default App
