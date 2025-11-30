const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    cliente: String,
    itens: Array,
    total: Number,
    status: String,
    data: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
