import Carousel from "../carousel/Carousel";
import CategoryCard from "../categoryCard/CategoryCard";

const lista = [
    {
        title: "Acessórios",
        productCount: 64,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyUBXO8s9Chgc2Uan0tFIa4L-65Dk9c525A&s"
    },
]

const CategoryCarousel = () => {
    return (
        <Carousel title={"Pesquise por Categoria"} items={lista} RenderComponent={({item}) => <CategoryCard categoria={item}/>} />
    );
}

export default CategoryCarousel;