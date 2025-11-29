import { useEffect, useState } from 'react';
import InsumoService from "../services/insumoService";

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);

  // Busca dados assim que a tela carrega
  useEffect(() => {
    async function loadData() {
      try {
        const dados = await InsumoService.buscarTodos();
        setInsumos(dados);
      } catch (error) {
        console.error("Erro ao buscar insumos", error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📦 Estoque</h1>
        <button className="primary-btn" style={{ width: 'auto' }}>+ Novo</button>
      </div>

      <div className="lista-insumos">
        {insumos.length === 0 ? (
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
    </div>
  );
}