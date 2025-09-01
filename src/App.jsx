import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import CategoryCard from './components/categoryCard/CategoryCard'
import CategoryCarousel from './components/categoryCarousel/CategoryCarousel'
import AnimalCard from './components/animalCard/AnimalCard'

const lista = [
  {
    name: "teste",
    image: "https://static.wixstatic.com/media/c4febe_7056c6d9a57b45598028781086f05711~mv2.png/v1/fill/w_267,h_176,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/coelho-comportamento-removebg-preview%20(1).png"
}]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AnimalCard animal={lista}/>
    </>
  )
}

export default App
