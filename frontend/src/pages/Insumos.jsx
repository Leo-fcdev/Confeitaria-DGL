import { useEffect, useState } from 'react';
import InsumoService from '../services/insumoService';
import FormularioInsumo from '../components/FormularioInsumo';

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 

  const loadData = async () => {
      setIsLoading(true);
      try {
        const dados = await InsumoService.buscarTodos();
        setInsumos(dados);
      } catch (error) {
        console.error("Erro ao buscar insumos", error);
      } finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  const handleSaveSuccess = () => {
    setShowForm(false); 
    loadData();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>📦 Estoque</h1>
        <button className="primary-btn" style={{ width: 'auto' }} onClick={() => setShowForm(true)}>
          + Novo
        </button>
      </div>

      {showForm ? (
        <FormularioInsumo onSave={handleSaveSuccess} onCancel={() => setShowForm(false)} />
      ) : (
        <div className="lista-insumos">
          {isLoading ? (
            <p>Carregando estoque...</p>
          ) : insumos.length === 0 ? (
            <p>Nenhum insumo cadastrado.</p>
          ) : (
            insumos.map((item) => (
              <div key={item._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0 }}>{item.nome}</h3>
                  <span style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>
                    R$ {item.preco?.toFixed(2)}
                  </span>
                </div>
                <p style={{ margin: '5px 0 0', color: 'var(--text-muted)' }}>
                  Quantidade: {item.quantidade_estoque} {item.unidade}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}