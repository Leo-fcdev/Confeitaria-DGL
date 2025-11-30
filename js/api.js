// Verifica onde o site está rodando
// Se for no meu computador (localhost), aponta pra porta 3001
// Se estiver online (Render), usa o endereço relativo "/api"
const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3001/api"
    : "/api";

async function fetchAPI(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        // Retorno uma lista vazia pro site não travar se der erro
        return [];
    }
}