const Pedido = require("../models/pedido");

exports.getPedidos = async (req, res) => {
    const pedidos = await Pedido.find();
    res.json(pedidos);
};

exports.criarPedido = async (req, res) => {
    const novo = await Pedido.create(req.body);
    res.json(novo);
};

exports.atualizarStatus = async (req, res) => {
    const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(pedido);
};