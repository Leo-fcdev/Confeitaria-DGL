document.addEventListener("DOMContentLoaded", carregarInsumos);

async function carregarInsumos() {
    const insumos = await fetchAPI("/insumos");
    const lista = document.getElementById("lista-insumos");
    lista.innerHTML = "";

    insumos.forEach((insumo) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        
        // Exibe o preço na lista se ele existir
        const textoPreco = insumo.preco ? ` | R$ ${insumo.preco.toFixed(2)}` : '';

        item.innerHTML = `
            <span>
                <strong>${insumo.nome}</strong>: ${insumo.quantidade} ${insumo.unidade}${textoPreco}
            </span>
            <button class="btn btn-danger btn-sm" onclick="deletarInsumo('${insumo._id}')">X</button>
        `;
        lista.appendChild(item);
    });
}

async function addInsumo() {
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const unidade = document.getElementById("unidade").value;
    
    // PEGA O VALOR DIGITADO NO NOVO CAMPO
    const preco = document.getElementById("preco").value; 

    if (!nome || !quantidade) return alert("Preencha todos os campos!");

    await fetchAPI("/insumos", "POST", { 
        nome, 
        quantidade: parseFloat(quantidade), 
        unidade,
        preco: parseFloat(preco) || 0 // ENVIA PRO SERVIDOR
    });
    
    // Limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("unidade").value = "";
    document.getElementById("preco").value = ""; // LIMPA O CAMPO NOVO

    carregarInsumos();
}

async function deletarInsumo(id) {
    if (confirm("Tem certeza que deseja deletar?")) {
        await fetchAPI(`/insumos/${id}`, "DELETE");
        carregarInsumos();
    }
}