// frontend/src/utils/calculos.js

export const calcularCustoTotal = (ingredientesDaReceita, insumosDisponiveis) => {
  if (!Array.isArray(ingredientesDaReceita) || !Array.isArray(insumosDisponiveis) || insumosDisponiveis.length === 0) {
      return 0;
  }
    
  let custoTotal = 0;

  for (const item of ingredientesDaReceita) {
    const insumo = insumosDisponiveis.find(i => i._id === item.insumo_id);
    
    if (insumo) {
        // Defesa Rigorosa: Se o valor não for numérico, usa 0.
        const precoCusto = parseFloat(insumo.preco) || 0; //
        const qtdNecessaria = parseFloat(item.qtd_necessaria) || 0; //

        const custoParcial = precoCusto * qtdNecessaria;
        custoTotal += custoParcial;
    }
  }
  // Retorna o resultado seguro (sem NaN)
  const resultado = parseFloat(custoTotal.toFixed(2));
  return isNaN(resultado) ? 0 : resultado;
};

export const calcularValorTotalEstoque = (insumos) => {
    if (!Array.isArray(insumos)) return 0;
    
    let valorTotal = 0;
    
    insumos.forEach(insumo => {
        const preco = parseFloat(insumo.preco) || 0;
        const estoque = parseFloat(insumo.quantidade_estoque) || 0;
        valorTotal += preco * estoque;
    });
    
    const resultado = parseFloat(valorTotal.toFixed(2));
    return isNaN(resultado) ? 0 : resultado;
};

export const calcularMargemLucroProdutos = (produtos, insumos) => {
    if (!Array.isArray(produtos) || !Array.isArray(insumos)) return [];
    
    return produtos.map(produto => {
        const custo = calcularCustoTotal(produto.ingredientes, insumos);
        
        const precoVenda = parseFloat(produto.preco_venda) || 0;
        const lucro = precoVenda - custo;
        
        return {
            nome: produto.nome,
            preco_venda: precoVenda,
            custo: custo,
            lucro: parseFloat(lucro.toFixed(2))
        };
    });
};