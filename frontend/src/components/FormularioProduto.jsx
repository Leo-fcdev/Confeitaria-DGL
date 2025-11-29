import { useState, useEffect } from 'react';
import ProdutoService from '../services/ProdutoService';
import InsumoService from '../services/insumoService'; 
import { calcularCustoTotal } from '../utils/calculos'; 

export default function FormularioProduto() {
    const [insumosDisponiveis, setInsumosDisponiveis] = useState([]);
    const [produtoData, setProdutoData] = useState({ nome: '', preco_venda: '', imagem: '' });
    
    const [receita, setReceita] = useState([]); 
    const [custoCalculado, setCustoCalculado] = useState(0);

    // Carrega a lista de insumos disponíveis
    useEffect(() => {
        const loadInsumos = async () => {
            const dados = await InsumoService.buscarTodos(); // GET /insumos
            setInsumosDisponiveis(dados);
        };
        loadInsumos();
    }, []);

    // LÓGICA DE PRECIFICAÇÃO DINÂMICA (Gatilho de cálculo)
    useEffect(() => {
        // Chama a função de cálculo segura
        const novoCusto = calcularCustoTotal(receita, insumosDisponiveis); 
        setCustoCalculado(novoCusto); // Esta linha agora deve ser segura (novoCusto é sempre um número)
    }, [receita, insumosDisponiveis]); 

    const handleCadastroProduto = async (e) => {
        e.preventDefault();
        
        const precoVendaNumerico = parseFloat(produtoData.preco_venda);
        
        if (receita.length === 0) {
            alert('Adicione ingredientes à receita.');
            return;
        }
        if (isNaN(precoVendaNumerico) || precoVendaNumerico <= 0) {
            alert('Preço de Venda inválido.');
            return;
        }

        const novoProduto = {
            ...produtoData,
            preco_venda: precoVendaNumerico,
            ingredientes: receita, //
            custo_producao: custoCalculado 
        };

        try {
            await ProdutoService.cadastrar(novoProduto); // POST /produtos
            
            const lucro = novoProduto.preco_venda - custoCalculado;
            alert(`Produto ${novoProduto.nome} cadastrado! Lucro estimado: R$ ${lucro.toFixed(2)}`);
            
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert('Erro ao salvar produto.');
        }
    };
    
    const handleAddIngredient = () => {
        if (insumosDisponiveis.length > 0) {
             const primeiroInsumo = insumosDisponiveis[0];
             setReceita([...receita, {
                 insumo_id: primeiroInsumo._id,
                 nome_insumo: primeiroInsumo.nome,
                 qtd_necessaria: 1, 
             }]);
        } else {
            alert("Cadastre insumos primeiro!");
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProdutoData({ ...produtoData, [name]: value });
    };

    return (
        <div className="card">
            <h2>Cadastrar Novo Produto</h2>
            <form onSubmit={handleCadastroProduto}>
                <input type="text" name="nome" placeholder="Nome do Produto" onChange={handleChange} required />
                <input type="number" name="preco_venda" step="0.01" placeholder="Preço de Venda" onChange={handleChange} required />
                <input type="text" name="imagem" placeholder="URL da Imagem" onChange={handleChange} />
                
                <hr style={{margin: '1rem 0'}} />
                
                <h3>Receita</h3>
                <p>Custo de Produção Calculado: <strong style={{color: 'red'}}>R$ {custoCalculado.toFixed(2)}</strong></p>
                <button type="button" onClick={handleAddIngredient}>Adicionar Ingrediente (Exemplo)</button>
                
                <button type="submit" className="primary-btn" style={{marginTop: '20px'}}>Salvar Produto</button>
            </form>
        </div>
    );
}