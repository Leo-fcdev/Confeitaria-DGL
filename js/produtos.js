let insumosDisponiveis = [];
let receitaAtual = []; 

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
    carregarOpcoesInsumos();
});

// Carrega a lista de produtos cadastrados
async function carregarProdutos() {
    const produtos = await fetchAPI("/produtos");
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    produtos.forEach((prod) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        
        const custoTexto = prod.custo ? `(Custo: R$ ${prod.custo.toFixed(2)})` : '';

        item.innerHTML = `
            <span>
                <strong>${prod.nome}</strong> - Venda: R$ ${prod.preco.toFixed(2)} 
                <small class="text-muted">${custoTexto}</small>
            </span>
            <button class="btn btn-danger btn-sm" onclick="deletarProduto('${prod._id}')">X</button>
        `;
        lista.appendChild(item);
    });
}

// Carrega insumos para o select
async function carregarOpcoesInsumos() {
    insumosDisponiveis = await fetchAPI("/insumos");
    const select = document.getElementById("select-insumo");
    select.innerHTML = '<option value="">Selecione um ingrediente...</option>';

    insumosDisponiveis.forEach(ins => {
        const option = document.createElement("option");
        option.value = ins._id;
        option.textContent = `${ins.nome} (${ins.unidade}) - R$ ${ins.preco ? ins.preco.toFixed(2) : '0.00'}/${ins.unidade}`;
        select.appendChild(option);
    });
}

// Adiciona insumo na lista temporária da receita
function addInsumoNaReceita() {
    const select = document.getElementById("select-insumo");
    const id = select.value;
    const qtd = parseFloat(document.getElementById("qtd-uso").value);

    if (!id || !qtd) return alert("Selecione o insumo e a quantidade!");

    const insumoReal = insumosDisponiveis.find(i => i._id === id);

    receitaAtual.push({
        id: id,
        nome: insumoReal.nome,
        quantidade: qtd,
        precoUnitario: insumoReal.preco,
        unidade: insumoReal.unidade
    });

    atualizarReceitaVisual();
    document.getElementById("qtd-uso").value = "";
}

// Atualiza a visualização da receita e custo estimado
function atualizarReceitaVisual() {
    const lista = document.getElementById("lista-receita");
    const spanCusto = document.getElementById("custo-estimado");
    lista.innerHTML = "";
    
    let custoTotal = 0;

    receitaAtual.forEach((item, index) => {
        const custoItem = (item.precoUnitario || 0) * item.quantidade;
        custoTotal += custoItem;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between py-1";
        li.innerHTML = `
            <small>${item.nome}: ${item.quantidade} ${item.unidade}</small>
            <small class="text-muted">R$ ${custoItem.toFixed(2)}</small>
            <button class="btn btn-sm text-danger p-0" onclick="removerItem(${index})">x</button>
        `;
        lista.appendChild(li);
    });

    spanCusto.innerText = custoTotal.toFixed(2);
}

function removerItem(index) {
    receitaAtual.splice(index, 1);
    atualizarReceitaVisual();
}

// Envia os dados do produto e receita para o backend
async function salvarProduto() {
    const nome = document.getElementById("produto-nome").value;
    const precoVenda = document.getElementById("produto-preco").value;

    if (!nome || !precoVenda) return alert("Preencha nome e preço de venda!");

    const payload = {
        nome,
        precoVenda: parseFloat(precoVenda),
        insumosUsados: receitaAtual 
    };

    await fetchAPI("/produtos", "POST", payload);

    alert("Produto cadastrado com sucesso!");
    
    document.getElementById("produto-nome").value = "";
    document.getElementById("produto-preco").value = "";
    receitaAtual = [];
    atualizarReceitaVisual();
    carregarProdutos();
    carregarOpcoesInsumos(); 
}

async function deletarProduto(id) {
    if (confirm("Deletar produto?")) {
        await fetchAPI(`/produtos/${id}`, "DELETE");
        carregarProdutos();
    }
}