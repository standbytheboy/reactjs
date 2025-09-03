import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Carousel from './components/carousel/Carousel'
import CategoryCard from './components/categoryCard/CategoryCard'
import CategoryCarousel from './components/categoryCarousel/CategoryCarousel'
import AnimalCard from './components/animalCard/AnimalCard'
import AnimalCarousel from './components/animalCarousel/AnimalCarousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
    </>
  )
}

export default App
