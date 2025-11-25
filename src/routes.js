const express = require('express');
const router = express.Router();

const Insumo = require('./models/Insumo')
const Produto = require('./models/Produto');

router.get('/insumos', async (req, res) => {
    try { 
        const insumos = await Insumo.find();
        res.json(insumos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar insumos" });
    }
});

router.post('/insumos', async (req, res) => {
    try {
        const novoInsumo = await Insumo.create(req.body);
        res.status(201).json(novoInsumo)
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar insumo "});
    }
});

router.get('/produtos', async (req, res) => {
    try { 
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos" });
    }
});

router.post('/produtos', async (req, res) => {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto)
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar produto" });
    }
});

module.exports = router;