let carrinho = []; // Lista temporária para guardar os itens do pedido atual
let totalPedido = 0;
let produtosDisponiveis = []; // Para guardar os produtos que vieram da API

document.addEventListener("DOMContentLoaded", () => {
    carregarPedidos();
    carregarOpcoesDeProdutos();
});

// Busca os produtos do banco para preencher o <select>
async function carregarOpcoesDeProdutos() {
    produtosDisponiveis = await fetchAPI("/produtos");
    const select = document.getElementById("select-produto");
    select.innerHTML = '<option value="">Selecione um produto...</option>';

    produtosDisponiveis.forEach(prod => {
        const option = document.createElement("option");
        option.value = prod._id;
        // Mostra o nome e o preço no dropdown
        option.textContent = `${prod.nome} (R$ ${prod.preco.toFixed(2)})`;
        select.appendChild(option);
    });
}

// Adiciona o produto selecionado à lista temporária (carrinho)
function adicionarItemAoPedido() {
    const select = document.getElementById("select-produto");
    const produtoId = select.value;

    if (!produtoId) return alert("Selecione um produto primeiro!");

    // Encontra o produto completo baseado no ID selecionado
    const produtoSelecionado = produtosDisponiveis.find(p => p._id === produtoId);

    // Adiciona ao carrinho
    carrinho.push(produtoSelecionado);
    
    // Atualiza a tela
    atualizarCarrinhoVisual();
}

// Atualiza a lista visual e recalcula o total
function atualizarCarrinhoVisual() {
    const lista = document.getElementById("lista-itens-carrinho");
    const spanTotal = document.getElementById("total-valor");
    
    lista.innerHTML = "";
    totalPedido = 0;

    carrinho.forEach((item, index) => {
        totalPedido += item.preco;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button class="btn btn-sm btn-outline-danger" onclick="removerDoCarrinho(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    spanTotal.innerText = totalPedido.toFixed(2);
}

// Remove um item do carrinho antes de salvar
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinhoVisual();
}

// Envia o pedido completo para o servidor
async function salvarPedido() {
    const cliente = document.getElementById("cliente").value;

    if (!cliente) return alert("Digite o nome do cliente!");
    if (carrinho.length === 0) return alert("Adicione pelo menos um produto ao pedido!");

    const pedido = {
        cliente: cliente,
        itens: carrinho.map(item => item.nome), // Envia apenas os nomes dos produtos
        total: totalPedido,
        status: "Pendente"
    };

    await fetchAPI("/pedidos", "POST", pedido);

    // Limpar tudo após salvar
    document.getElementById("cliente").value = "";
    carrinho = [];
    atualizarCarrinhoVisual();
    
    alert("Pedido salvo com sucesso!");
    carregarPedidos(); // Recarrega a lista de pedidos lá embaixo
}

// --- Funções de Listagem (Iguais às anteriores) ---

async function carregarPedidos() {
    const pedidos = await fetchAPI("/pedidos");
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    pedidos.forEach((p) => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        
        const itensTexto = Array.isArray(p.itens) ? p.itens.join(", ") : p.itens;

        item.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>${p.cliente}</strong> <br>
                    <small class="text-muted">${itensTexto}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-${p.status === 'Pendente' ? 'warning' : 'success'}">${p.status}</span>
                    <br> <strong>R$ ${p.total ? p.total.toFixed(2) : '0.00'}</strong>
                </div>
            </div>
            <div class="mt-2 text-end">
                ${p.status === 'Pendente' ? `<button class="btn btn-sm btn-success" onclick="mudarStatus('${p._id}', 'Entregue')">Marcar como Entregue</button>` : ''}
            </div>
        `;
        lista.appendChild(item);
    });
}

async function mudarStatus(id, novoStatus) {
    await fetchAPI(`/pedidos/${id}/status`, "PUT", { status: novoStatus });
    carregarPedidos();
}