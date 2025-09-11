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

  const API_KEY = "suakeyaqui";
  const API_SECRET = "suakeyaqui";

  useEffect(() => {
    const fetchTokenAndPets = async () => {
      if (loading) return; // 2. Previne novas chamadas se uma já estiver em andamento
      setLoading(true);

      try {
        // 3. A chamada para o token NÃO usa o proxy, pois é uma URL diferente
        const tokenResponse = await axios.post(
          "https://api.petfinder.com/v2/oauth2/token",
          `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        const accessToken = tokenResponse.data.access_token;

        // 4. A chamada para os animais AGORA USA O PROXY
        // Note que a URL começa com '/pf-api'
        const petsResponse = await axios.get(
          `/pf-api/animals?page=${paginaAtual}&limit=${produtosPorPagina}&type=Dog`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const petsComImagem = petsResponse.data.animals.filter(
          (pet) =>
            pet.primary_photo_cropped || (pet.photos && pet.photos.length > 0)
        );

        // Mapeia os dados da API para o formato que seu ProductCard espera
        const formattedPets = petsComImagem.map((pet) => {
          const imageUrl =
            pet.primary_photo_cropped?.medium || pet.photos[0]?.medium;
          return {
            id: pet.id,
            name: pet.name,
            price: pet.breeds.primary,
            image: imageUrl,
          };
        });

        setPets(formattedPets);
        // Calculamos nosso próprio total de páginas
        const totalDeAnimaisNaAPI = petsResponse.data.pagination.total_count;
        // O total de animais a considerar é o MENOR entre o nosso limite e o total real da API
        const totalConsiderado = Math.min(
          MAXIMO_DE_ANIMAIS,
          totalDeAnimaisNaAPI
        );
        // Agora calculamos o total de páginas com base nesse número
        const nossoTotalDePaginas = Math.ceil(
          totalConsiderado / produtosPorPagina
        );

        setTotalDePaginas(nossoTotalDePaginas);
      } catch (error) {
        console.error("Erro ao buscar dados da Petfinder API:", error);
      } finally {
        setLoading(false); // 5. Libera para novas chamadas, mesmo se der erro
      }
    };

    fetchTokenAndPets();
  }, [paginaAtual]); // Adicione paginaAtual como dependência

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
