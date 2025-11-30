document.addEventListener("DOMContentLoaded", carregarInsumos);

async function carregarInsumos() {
    const insumos = await fetchAPI("/insumos");
    const lista = document.getElementById("lista-insumos");
    lista.innerHTML = "";

    insumos.forEach((insumo) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.innerHTML = `
            ${insumo.nome} - ${insumo.quantidade} ${insumo.unidade}
            <button class="btn btn-danger btn-sm" onclick="deletarInsumo('${insumo._id}')">X</button>
        `;
        lista.appendChild(item);
    });
}

async function addInsumo() {
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const unidade = document.getElementById("unidade").value;

    if (!nome || !quantidade) return alert("Preencha todos os campos!");

    await fetchAPI("/insumos", "POST", { nome, quantidade, unidade });
    
    // Limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("unidade").value = "";

    carregarInsumos();
}

async function deletarInsumo(id) {
    if (confirm("Tem certeza que deseja deletar?")) {
        await fetchAPI(`/insumos/${id}`, "DELETE");
        carregarInsumos();
    }
}