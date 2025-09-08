import ShopSidebar from '../shopSidebar/ShopSidebar';
import ProductCard from '../productCard/ProductCard';
import './ProductGrid.css';
import { useState } from 'react';

const todosProdutos = [
  { id: 1, nome: "Camiseta", preco: 29.99 },
  { id: 2, nome: "Calça Jeans", preco: 79.99 },
  { id: 3, nome: "Tênis", preco: 120.00 },
  { id: 4, nome: "Boné", preco: 19.99 },
  { id: 5, nome: "Mochila", preco: 150.50 },
  { id: 6, nome: "Relógio", preco: 250.00 },
  { id: 7, nome: "Óculos de Sol", preco: 180.75 },
  { id: 8, nome: "Jaqueta", preco: 300.00 },
  { id: 9, nome: "Meias", preco: 12.50 },
  { id: 10, nome: "Tênis de Corrida", preco: 130.00 },
  { id: 11, nome: "Camisa Social", preco: 45.00 },
  { id: 12, nome: "Cinto", preco: 35.00 },
  { id: 13, nome: "Carteira", preco: 60.00 },
  { id: 14, nome: "Luvas", preco: 25.00 },
  { id: 15, nome: "Gorro", preco: 20.00 },
  { id: 16, nome: "Blusa de Frio", preco: 100.00 },
  { id: 17, nome: "Shorts", preco: 40.00 },
  { id: 18, nome: "Chinelo", preco: 15.00 },
  { id: 19, nome: "Sandália", preco: 50.00 },
  { id: 20, nome: "Bolsa", preco: 200.00 },
  { id: 21, nome: "Pulseira", preco: 45.50 },
  { id: 22, nome: "Brinco", preco: 60.00 },
  { id: 23, nome: "Colar", preco: 80.00 },
  { id: 24, nome: "Camiseta Regata", preco: 25.00 },
  { id: 25, nome: "Calça Legging", preco: 70.00 },
  { id: 26, nome: "Jaqueta Corta Vento", preco: 150.00 },
  { id: 27, nome: "Moletom", preco: 90.00 },
  { id: 28, nome: "Tênis Casual", preco: 110.00 },
  { id: 29, nome: "Relógio Digital", preco: 300.00 },
  { id: 30, nome: "Carteira Masculina", preco: 55.00 }
];

const listaDeCategorias = [
  { nome: "Brinquedos", qtd: 32 }, // índice 0
  { nome: "Roupas", qtd: 30 }, // índice 1
  { nome: "Comidas", qtd: 100 },
];
 
const listaDeMarcas = [
  { nome: "Royal Canin", qtd: 30 },
  { nome: "K9 Spirit", qtd: 20 },
  { nome: "Premier", qtd: 10 },
];

const ProductGrid = () => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 6;

    // ceil serve para arrendodar pra cima
    const totalDePaginas = Math.ceil(todosProdutos.length / produtosPorPagina);
    const indiceUltimoProduto = paginaAtual * produtosPorPagina;
    const indicePrimeiroProduto = indiceUltimoProduto - produtosPorPagina;
    const produtosAtuais = todosProdutos.slice(indicePrimeiroProduto, indiceUltimoProduto);

    const mudarPaginaAtual = (numeroDaPagina) => {
        setPaginaAtual(numeroDaPagina)
    }

    return(
        <div className='product-grid-container'>
            <ShopSidebar listaDeCategorias={listaDeCategorias} listaDeMarcas={listaDeMarcas}/>
            <main className='product-list-section'>
                <header className='product-list-header'>
                    <p>Mostrando {indicePrimeiroProduto + 1} até {Math.min(indicePrimeiroProduto, todosProdutos.length)} de {todosProdutos.length} resultados</p>

                    <div className='sort-by'>
                        <label htmlFor="sort">Ordenar por: </label>
                        <select name="sort" id="sort">
                            <option value="default">Mais recente</option>
                            <option value="price-asc">Preço: menor ao maior</option>
                            <option value="price-desc">Preço: maior ao menor</option>
                            <option value="name-asc">Nome: A-Z</option>
                        </select>
                    </div>
                </header>

                <div className='products-grid'>
                    {produtosAtuais.map(produto => (
                        <ProductCard key={produto.id} product={produto}/>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductGrid;