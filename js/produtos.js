document.addEventListener("DOMContentLoaded", carregarProdutos);

async function carregarProdutos() {
    const produtos = await fetchAPI("/produtos");
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    produtos.forEach((prod) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
            <span><strong>${prod.nome}</strong> - R$ ${prod.preco}</span>
            <button class="btn btn-danger btn-sm" onclick="deletarProduto('${prod._id}')">X</button>
        `;
        lista.appendChild(item);
    });
}

async function addProduto() {
    const nome = document.getElementById("produto-nome").value;
    const preco = document.getElementById("produto-preco").value;

    if (!nome || !preco) return alert("Preencha os campos!");

    await fetchAPI("/produtos", "POST", { 
        nome, 
        preco: parseFloat(preco),
        estoque: 0 // Valor padrão já que não tem campo no HTML
    });

    document.getElementById("produto-nome").value = "";
    document.getElementById("produto-preco").value = "";

    carregarProdutos();
}

async function deletarProduto(id) {
    if (confirm("Deletar produto?")) {
        await fetchAPI(`/produtos/${id}`, "DELETE");
        carregarProdutos();
    }
}