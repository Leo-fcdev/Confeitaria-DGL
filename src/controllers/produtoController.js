const Produto = require("../models/produto");

exports.getProdutos = async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
};

exports.criarProduto = async (req, res) => {
    const novo = await Produto.create(req.body);
    res.json(novo);
};

exports.deletarProduto = async (req, res) => {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Produto deletado" });
};
