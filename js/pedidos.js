document.addEventListener("DOMContentLoaded", carregarPedidos);

async function carregarPedidos() {
    const pedidos = await fetchAPI("/pedidos");
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    pedidos.forEach((p) => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        
        // Formata a lista de itens (assumindo que é um array simples ou string)
        const itensTexto = Array.isArray(p.itens) ? p.itens.join(", ") : p.itens;

        item.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <strong>${p.cliente}</strong> <br>
                    <small>${itensTexto}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-${p.status === 'Pendente' ? 'warning' : 'success'}">${p.status}</span>
                    <br> R$ ${p.total}
                </div>
            </div>
            <div class="mt-2 text-end">
                ${p.status === 'Pendente' ? `<button class="btn btn-sm btn-success" onclick="mudarStatus('${p._id}', 'Entregue')">Marcar como Entregue</button>` : ''}
            </div>
        `;
        lista.appendChild(item);
    });
}

async function addPedido() {
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    const valor = document.getElementById("valor").value;

    if (!cliente || !produto || !valor) return alert("Preencha tudo!");

    const pedido = {
        cliente,
        itens: [produto], // Backend espera Array
        total: parseFloat(valor),
        status: "Pendente"
    };

    await fetchAPI("/pedidos", "POST", pedido);

    document.getElementById("cliente").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";

    carregarPedidos();
}

async function mudarStatus(id, novoStatus) {
    await fetchAPI(`/pedidos/${id}/status`, "PUT", { status: novoStatus });
    carregarPedidos();
}