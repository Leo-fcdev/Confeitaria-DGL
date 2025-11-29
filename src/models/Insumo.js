const mongoose = require('mongoose');

const InsumoSchema =  new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    unidade: {
        type: String,
        required: true 
    },
    preco: {
        type: Number,
        required: true
    },
    quantidade_estoque: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Insumo' , InsumoSchema);