import ShopSidebar from "../shopSidebar/ShopSidebar";
import ProductCard from "../productCard/ProductCard";
import "./ProductGrid.css";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import axios from "axios";

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
  const [pets, setPets] = useState([]);
  const [totalDePaginas, setTotalDePaginas] = useState(1);
  const [loading, setLoading] = useState(false);

  const produtosPorPagina = 6;
  const MAXIMO_DE_ANIMAIS = 50;

  const API_KEY = "key_aqui";
  const API_SECRET = "key_aqui";

  const obterToken = async () => {
  const response = await axios.post(
    "https://api.petfinder.com/v2/oauth2/token",
    `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return response.data.access_token;
};

const buscarPets = async (token, pagina, limite) => {
  const response = await axios.get(
    `/pf-api/animals?page=${pagina}&limit=${limite}&type=Dog`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


 useEffect(() => {
  const fetchTokenAndPets = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await obterToken();
      const data = await buscarPets(token, paginaAtual, produtosPorPagina);

      const petsComImagem = data.animals.filter(
        (pet) =>
          pet.primary_photo_cropped || (pet.photos && pet.photos.length > 0)
      );

      const formattedPets = petsComImagem.map((pet) => ({
        id: pet.id,
        name: pet.name,
        price: pet.breeds.primary,
        image:
          pet.primary_photo_cropped?.medium || pet.photos[0]?.medium,
      }));

      setPets(formattedPets);

      const totalConsiderado = Math.min(
        MAXIMO_DE_ANIMAIS,
        data.pagination.total_count
      );

      setTotalDePaginas(
        Math.ceil(totalConsiderado / produtosPorPagina)
      );
    } catch (error) {
      console.error("Erro ao buscar dados da Petfinder API:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTokenAndPets();
}, [paginaAtual]);


  const mudarPaginaAtual = (numeroDaPagina) => {
    setPaginaAtual(numeroDaPagina);
  };

  return (
    <div className="product-grid-container">
      <ShopSidebar
        listaDeCategorias={listaDeCategorias}
        listaDeMarcas={listaDeMarcas}
      />
      <main className="product-list-section">
        {loading && <p>Carregando animais...</p>}
        {!loading && (
          <>
            <header className="product-list-header">
              <p>Mostrando {pets.length} resultados</p>

              <div className="sort-by">
                <label htmlFor="sort">Ordenar por: </label>
                <select name="sort" id="sort">
                  <option value="default">Mais recente</option>
                  <option value="price-asc">Preço: menor ao maior</option>
                  <option value="price-desc">Preço: maior ao menor</option>
                  <option value="name-asc">Name: A-Z</option>
                </select>
              </div>
            </header>

            <div className="products-grid">
              {pets.map((pet) => (
                <ProductCard key={pet.id} product={pet} />
              ))}
            </div>

            <Pagination
              totalDePaginas={totalDePaginas}
              paginaAtual={paginaAtual}
              mudarPaginaAtual={mudarPaginaAtual}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default ProductGrid;
