require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path"); // Importei isso pra lidar com os caminhos das pastas

const produtosRoutes = require("./routes/produtos");
const pedidosRoutes = require("./routes/pedidos");
const insumosRoutes = require("./routes/insumos");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// -- MINHAS ROTAS DE API --
app.use("/api/produtos", produtosRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/insumos", insumosRoutes);

// -- PARTE DO SITE (FRONTEND) --

// Aqui eu falo pro servidor que os arquivos do site (HTML, CSS, JS) estão na pasta principal
app.use(express.static(path.join(__dirname, "../")));

// O "pulo do gato": Qualquer link que não for API, eu mando abrir o index.html
// Isso garante que o site carregue certinho
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});