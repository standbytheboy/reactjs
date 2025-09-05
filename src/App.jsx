import './App.css'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import CategoryCarousel from './components/categoryCarousel/CategoryCarousel'
import FeaturedProducts from './components/featuredComponents/FeaturedProducts'
import AnimalCarousel from './components/animalCarousel/AnimalCarousel'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <CategoryCarousel />
      <FeaturedProducts />
      <AnimalCarousel />
      <Footer />
    </>
  )
}

export default App
