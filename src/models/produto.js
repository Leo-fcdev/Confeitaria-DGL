const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    categoria: String,
    estoque: Number,
});

module.exports = mongoose.model("Produto", ProdutoSchema);
