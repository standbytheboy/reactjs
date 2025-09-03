import HeroIMG from '../../assets/heroImg.svg'
import './Hero.css'
import CTAButton from '../ctaBtn/CTAButton'

const Hero = () => {

    return (
        <section className='hero'>
            <div className='hero-content'>
                <span className='subtitle'>Pet Shop</span>
                <h1>Bem vindo ao Petshop do "Fulano"!!</h1>
                <p>Aqui você encontra tudo para seu animal de estimação ficar no estilo sempre!</p>
                <CTAButton text='Comprar Agora'></CTAButton>
            </div>
            <div className='hero-image-container'>
                <img src={HeroIMG} alt="Imagem da Seção Hero" />
            </div>

        </section>
    )
}

export default Hero;