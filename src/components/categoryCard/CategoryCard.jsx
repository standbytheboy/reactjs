import './CategoryCard.css';
import { ChevronRight } from 'akar-icons';

const CategoryCard = ({ image, title, productCount }) => {
    return (
        <div className='category-card'>
            <div className='card-image-wrapper'>
                <img className='category-image' src={image} alt={title}/>
            </div>

            <div className='card-info'>
                <div className='card-text'>
                    <h3 className='card-title'>{title}</h3>
                    <p className='product-count'>{productCount}</p>
                </div>

                <div className='arrow-icon'>
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
    
}

export default CategoryCard;