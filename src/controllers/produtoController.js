const Produto = require("../models/produto");
const Insumo = require("../models/insumo");

exports.getProdutos = async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
};

exports.criarProduto = async (req, res) => {
    try {
        const { nome, precoVenda, insumosUsados } = req.body;

        let custoTotal = 0;

        // Calcula o custo e atualiza estoque dos insumos
        if (insumosUsados && insumosUsados.length > 0) {
            for (const item of insumosUsados) {
                const insumoDoc = await Insumo.findById(item.id);
                
                if (insumoDoc) {
                    // Custo baseado no preço unitário
                    const custoItem = insumoDoc.preco * item.quantidade;
                    custoTotal += custoItem;

                    // Baixa no estoque
                    insumoDoc.quantidade -= item.quantidade;
                    await insumoDoc.save();
                }
            }
        }

        const novoProduto = await Produto.create({
            nome,
            preco: precoVenda,
            custo: custoTotal,
            estoque: 1 // Define estoque inicial como 1
        });

        res.json(novoProduto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
};

exports.deletarProduto = async (req, res) => {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Produto deletado" });
};