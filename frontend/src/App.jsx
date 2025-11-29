import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'; // Adicionando .jsx
import Insumos from './pages/Insumos.jsx'; // Adicionando .jsx
import PaginaPedidos from "./pages/PaginaPedidos.jsx"; // CORRIGIDO: Adicionando .jsx
import FormularioProduto from "./components/FormularioProduto.jsx"; // Adicionando .jsx
import ProdutoService from './services/ProdutoService';
import { useEffect, useState } from 'react';

// Página Home simples
function Home() {
  return (
    <div className="container">
      <h1>🎂 Confeitaria DGL</h1>
      <div className="card">
        <p>Bem-vindo ao sistema de gestão.</p>
        <p>Selecione uma opção no menu.</p>
      </div>
    </div>
  );
}

// Página de Gestão de Produtos (Cadastro de Receitas + Listagem)
function GerenciarProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const loadProdutos = async () => {
            const dados = await ProdutoService.buscarTodos(); //
            setProdutos(dados);
        };
        loadProdutos();
    }, []);

    return (
        <div className="container">
            <h1>🍰 Gestão de Cardápio</h1>
            
            <FormularioProduto />
            
            <hr style={{margin: '30px 0'}} />
            
            <h2>Produtos Cadastrados</h2>
            {produtos.map(p => (
                <div key={p._id} className="card">
                    <h3>{p.nome}</h3>
                    <p>Preço de Venda: R$ {p.preco_venda?.toFixed(2)}</p>
                    <p>Custo de Produção: R$ {p.custo_producao?.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insumos" element={<Insumos />} />
        
        <Route path="/produtos" element={<GerenciarProdutos />} /> 
        
        <Route path="/pedidos" element={<PaginaPedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;