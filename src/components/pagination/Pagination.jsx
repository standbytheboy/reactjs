import './Pagination.css';

const Pagination = ( {totalDePaginas} ) => {
    return(
        <div className='pagination'>
            {Array.from( { length: totalDePaginas }, (_, i) => i + 1).map(page => (
                
            ))}
        </div>
    );

}

export default Pagination;