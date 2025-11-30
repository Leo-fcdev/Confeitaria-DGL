const Produto = require("../models/produto");
const Insumo = require("../models/insumo");

exports.getProdutos = async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
};

exports.criarProduto = async (req, res) => {
    try {
        const { nome, precoVenda, insumosUsados } = req.body;

        // 1. Calcular Preço de Custo e Baixar Estoque
        let custoTotal = 0;

        if (insumosUsados && insumosUsados.length > 0) {
            for (const item of insumosUsados) {
                const insumoDoc = await Insumo.findById(item.id);
                
                if (insumoDoc) {
                    // Cálculo proporcional do custo (regra de 3 simples baseada no preço do insumo)
                    // Ex: Se 1kg custa 10 reais, e usamos 0.5 (metade), custo é 5.
                    // ATENÇÃO: Assume-se que a "unidade" de uso é compatível com a de compra.
                    const proporcao = item.quantidade / insumoDoc.quantidade; 
                    
                    // Se o insumo tiver preço cadastrado, soma ao custo. Se não, considera 0.
                    // Nota: Aqui simplifiquei assumindo que o preço no insumo é pelo TOTAL da quantidade atual
                    // Se o preço for unitário (por kg), a lógica muda um pouco. 
                    // Vamos assumir que o usuário cadastra "Preço pago pelo pacote/quantidade total"
                    const custoItem = (insumoDoc.preco / insumoDoc.quantidade) * item.quantidade;
                    custoTotal += custoItem;

                    // Subtrair do estoque
                    insumoDoc.quantidade -= item.quantidade;
                    await insumoDoc.save();
                }
            }
        }

        // 2. Criar o Produto com o custo calculado
        const novoProduto = await Produto.create({
            nome,
            preco: precoVenda,
            custo: custoTotal, // Guardamos o custo calculado
            estoque: 1 // Começa com 1 unidade produzida (ou ajustável se quiser)
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