import { useState, useEffect } from 'react';
import ProdutoService from '../services/ProdutoService';
import InsumoService from '../services/insumoService';   
import { calcularCustoTotal } from '../utils/calculos';     

export default function PaginaPedidos() {
    const [cardapio, setCardapio] = useState([]);
    const [insumosDisponiveis, setInsumosDisponiveis] = useState([]); 
    const [pedido, setPedido] = useState([]); 
    
    const [totalPedidoVenda, setTotalPedidoVenda] = useState(0); 
    const [totalPedidoCusto, setTotalPedidoCusto] = useState(0); 

    // 1. Carrega Produtos e Insumos ao montar
    useEffect(() => {
        const loadData = async () => {
            try {
                const produtos = await ProdutoService.buscarTodos(); //
                setCardapio(produtos);

                const insumos = await InsumoService.buscarTodos(); //
                setInsumosDisponiveis(insumos);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        loadData();
    }, []);

    // 2. LÓGICA DO CÁLCULO DINÂMICO
    useEffect(() => {
        let novoTotalVenda = 0;
        let novoTotalCusto = 0;
        
        pedido.forEach(item => {
            novoTotalVenda += item.preco_venda * item.quantidade;
            
            if (item.custoUnitario) {
                novoTotalCusto += item.custoUnitario * item.quantidade;
            }
        });

        setTotalPedidoVenda(novoTotalVenda);
        setTotalPedidoCusto(novoTotalCusto);

    }, [pedido]); 

    // 3. AÇÃO: Adicionar Item ao Pedido
    const handleAddItem = (produto, quantidade = 1) => {
        // CÁLCULO DE CUSTO UNITÁRIO: Usando sua lógica
        const custoUnitario = calcularCustoTotal(produto.ingredientes, insumosDisponiveis); 
        
        const itemExistente = pedido.find(item => item._id === produto._id);

        if (itemExistente) {
            setPedido(pedido.map(item =>
                item._id === produto._id
                    ? { ...item, quantidade: item.quantidade + quantidade }
                    : item
            ));
        } else {
            setPedido([...pedido, {
                _id: produto._id,
                nome: produto.nome,
                preco_venda: produto.preco_venda,
                custoUnitario: custoUnitario, 
                quantidade: quantidade
            }]);
        }
    };
    
    // 4. AÇÃO: Finalizar Venda
    const handleFinalizarPedido = () => {
        if (pedido.length === 0) {
            alert("O pedido está vazio.");
            return;
        }
        
        alert(`Venda finalizada! Total Venda: R$ ${totalPedidoVenda.toFixed(2)}. Custo Estimado: R$ ${totalPedidoCusto.toFixed(2)}`);
        setPedido([]); 
    };

    return (
        <div className="container">
            <h1>🛒 Novo Pedido</h1>

            <div className="lista-produtos">
                <h2>Selecione os Produtos</h2>
                {cardapio.map(produto => (
                    <div key={produto._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0 }}>{produto.nome}</h3>
                            <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>R$ {produto.preco_venda?.toFixed(2)}</p>
                        </div>
                        <button 
                            className="primary-btn" 
                            style={{ width: 'auto' }}
                            onClick={() => handleAddItem(produto)}
                        >
                            + Add
                        </button>
                    </div>
                ))}
            </div>
            
            <hr style={{ margin: '30px 0' }} />

            <div className="resumo-pedido">
                <h2>Resumo do Pedido</h2>
                {pedido.length === 0 ? (
                    <p>Adicione itens ao pedido.</p>
                ) : (
                    <>
                        {pedido.map(item => (
                            <div key={item._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{item.nome} x {item.quantidade}</span>
                                <span>Venda: R$ {(item.preco_venda * item.quantidade).toFixed(2)}</span>
                            </div>
                        ))}
                        
                        <div style={{ marginTop: '20px', borderTop: '2px solid var(--accent-color)', paddingTop: '10px' }}>
                            <h3 style={{ margin: 0 }}>Total Venda: R$ {totalPedidoVenda.toFixed(2)}</h3>
                            <h3 style={{ margin: 0, color: '#888' }}>Custo Total: R$ {totalPedidoCusto.toFixed(2)}</h3>
                            <h3 style={{ margin: 0, color: 'var(--success-color)' }}>Lucro Estimado: R$ {(totalPedidoVenda - totalPedidoCusto).toFixed(2)}</h3>
                        </div>

                        <button className="primary-btn" style={{ marginTop: '20px' }} onClick={handleFinalizarPedido}>
                            Finalizar Venda
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}