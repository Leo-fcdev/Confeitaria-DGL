const mongoose = require("mongoose");

const InsumoSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    unidade: String,
});

module.exports = mongoose.model("Insumo", InsumoSchema);