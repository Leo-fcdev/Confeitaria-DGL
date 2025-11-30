require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const produtosRoutes = require("./routes/produtos");
const pedidosRoutes = require("./routes/pedidos");
const insumosRoutes = require("./routes/insumos");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/produtos", produtosRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/insumos", insumosRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
