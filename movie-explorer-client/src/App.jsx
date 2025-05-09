import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import TrendingMovies from './Components/TrendingMovies'
import Home from './Components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home />
    </>
  )
}

export default App
