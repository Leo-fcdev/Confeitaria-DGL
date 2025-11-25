const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    imagem: String,
    preco_venda: Number,

    ingredientes: [{
        insumo_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Insumo'          
        },
        nome_insumo: String,
        qtd_necessaria: Number
    }]
});

module.exports = mongoose.model('Produto', ProdutoSchema)