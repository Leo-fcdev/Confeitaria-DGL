import api from '../api/api';

const InsumoService = {
    // Rota GET /insumos
    buscarTodos: async () => {
        const response = await api.get('/insumos');
        return response.data;
    },
    
    // Rota POST /insumos
    cadastrar: async (novoInsumo) => {
        const response = await api.post('/insumos', novoInsumo);
        return response.data;
    }
};

export default InsumoService;