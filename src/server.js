require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("BANCO DE DADOS CONECTADO COM SUCESSO!");
    })
    .catch((erro) => {
        console.log("ERRO AO CONECTAR NO BANCO:");
        console.error(erro);
    });

app.use(routes)

/*
app.get('/', (req, res) => {
    res.send('O servidor backend está rodando!');
});
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});