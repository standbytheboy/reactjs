import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import CategoryCard from './components/categoryCard/CategoryCard'
import CategoryCarousel from './components/categoryCarousel/CategoryCarousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CategoryCarousel />
    </>
  )
}

export default App
