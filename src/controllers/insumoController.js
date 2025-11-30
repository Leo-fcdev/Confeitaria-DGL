const Insumo = require("../models/insumo");

exports.getInsumos = async (req, res) => {
    const insumos = await Insumo.find();
    res.json(insumos);
};

exports.criarInsumo = async (req, res) => {
    const novo = await Insumo.create(req.body);
    res.json(novo);
};

exports.deletarInsumo = async (req, res) => {
    await Insumo.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Insumo deletado" });
};
