import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Insumos from './pages/Insumos';

// Página Home simples só pra não dar erro 404
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

// Página Produtos simples (Placeholderr)
function Produtos() {
    return <div className="container"><h1>🍰 Cardápio</h1><p>Em construção...</p></div>;
}

function App() {
  return (
    <BrowserRouter>
      {/* O Navbar fica fora das Routes para aparecer em todas as telas */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insumos" element={<Insumos />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;