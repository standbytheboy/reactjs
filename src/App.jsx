import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Carousel from './components/carousel/Carousel'
import CategoryCard from './components/categoryCard/CategoryCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CategoryCard 
      title={"Brinquedos"} 
      productCount={"84 itens"} 
      image={"https://cdn.abrainc.org.br/files/2023/10/a2a1069e-86f0-445f-a1b6-30d7ec407498.webp"}/>
    </>
  )
}

export default App
