const mongoose = require("mongoose");

const InsumoSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    unidade: String,
    preco: Number, 
});

module.exports = mongoose.model("Insumo", InsumoSchema);