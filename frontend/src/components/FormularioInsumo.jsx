import { useState } from 'react';
import InsumoService from '../services/insumoService';

export default function FormularioInsumo({ onSave, onCancel }) {
    const [formData, setFormData] = useState({ 
        nome: '', 
        unidade: '', 
        preco: '',
        quantidade_estoque: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'preco' || name === 'quantidade_estoque' 
            ? parseFloat(value) || value
            : value;
            
        setFormData({ ...formData, [name]: newValue });
    };
    
    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.unidade || !formData.preco) {
             alert('Por favor, preencha Nome, Unidade e Preço.');
             return;
        }

        try {
            const response = await InsumoService.cadastrar(formData);
            
            alert(`Insumo ${response.nome} salvo com sucesso!`);
            
            // Corrige o TypeError verificando se a função existe
            if (onSave) { 
                onSave(response); 
            }
            
        } catch (error) {
            console.error('Erro ao cadastrar insumo:', error);
            alert(`Erro ao salvar: ${error.response?.data?.error || 'Verifique o terminal do Backend.'}`);
        }
    };

    return (
        <div className="card">
            <h2>Cadastrar Novo Insumo</h2>
            <form onSubmit={handleCadastro}>
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" name="unidade" placeholder="Unidade (ex: kg, lata)" value={formData.unidade} onChange={handleChange} required />
                <input type="number" name="preco" step="0.01" placeholder="Preço de Custo (0.00)" value={formData.preco} onChange={handleChange} required />
                <input type="number" name="quantidade_estoque" placeholder="Qtd. em Estoque" value={formData.quantidade_estoque} onChange={handleChange} />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button type="submit" className="primary-btn">Salvar</button>
                    <button type="button" onClick={onCancel} className="primary-btn" style={{ background: 'var(--text-muted)' }}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}