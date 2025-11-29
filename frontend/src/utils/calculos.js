// Calcula o custo total de um produto com base em sua receita.
export const calcularCustoTotal = (ingredientesDaReceita, insumosDisponiveis) => {
  let custoTotal = 0;

  for (const item of ingredientesDaReceita) {
    // Busca o insumo correspondente para obter o preço de custo
    const insumo = insumosDisponiveis.find(i => i._id === item.insumo_id);
    
    if (insumo && insumo.preco) {
        // Custo = Preço do Insumo x Quantidade necessária
        const custoParcial = insumo.preco * item.qtd_necessaria;
        custoTotal += custoParcial;
    }
  }
  return parseFloat(custoTotal.toFixed(2));
};

// Calcula o valor total investido no estoque.
export const calcularValorTotalEstoque = (insumos) => {
    let valorTotal = 0;
    
    insumos.forEach(insumo => {
        // Cálculo: Preço de Custo x Quantidade em Estoque
        valorTotal += insumo.preco * insumo.quantidade_estoque;
    });
    
    return parseFloat(valorTotal.toFixed(2));
};

// Calcula a margem de lucro de cada produto.
export const calcularMargemLucroProdutos = (produtos, insumos) => {
    return produtos.map(produto => {
        // Usa a função central para obter o custo
        const custo = calcularCustoTotal(produto.ingredientes, insumos);
        
        // Lucro = Preço de Venda - Custo
        const lucro = produto.preco_venda - custo;
        
        return {
            nome: produto.nome,
            preco_venda: produto.preco_venda,
            custo: custo,
            lucro: parseFloat(lucro.toFixed(2))
        };
    });
};