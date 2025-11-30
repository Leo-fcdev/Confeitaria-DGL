document.addEventListener("DOMContentLoaded", carregarDashboard);

async function carregarDashboard() {
    const pedidos = await fetchAPI("/pedidos");

    let totalVendas = 0;
    let lucroTotal = 0;
    let pendentes = 0;

    pedidos.forEach(p => {
        totalVendas++;
        lucroTotal += p.total || 0;
        
        if (p.status === "Pendente") {
            pendentes++;
        }
    });

    // Atualiza o HTML
    document.getElementById("metric-vendas").innerText = totalVendas;
    document.getElementById("metric-lucro").innerText = `R$ ${lucroTotal.toFixed(2)}`;
    document.getElementById("metric-pendentes").innerText = pendentes;
}