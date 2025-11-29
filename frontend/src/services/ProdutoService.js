import api from '../api/api';

const ProdutoService = {
    // Rota GET /produtos
    buscarTodos: async () => {
        const response = await api.get('/produtos');
        return response.data;
    },
    
    // Rota POST /produtos
    cadastrar: async (novoProduto) => {
        const response = await api.post('/produtos', novoProduto);
        return response.data;
    }
};

export default ProdutoService;