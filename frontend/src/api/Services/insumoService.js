import api from '../api';

const InsumoService = {
    // Rota GET pros insumos
    buscarTodos: async () => {
        const response = await api.get('/insumos');
        return response.data;
    },
    
    // Rota POST pros insumos insumos
    cadastrar: async (novoInsumo) => {
        const response = await api.post('/insumos', novoInsumo);
        return response.data;
    }
    
};

export default InsumoService;