const express = require("express");
const router = express.Router();
const controller = require("../controllers/produtoController");

// Define as rotas e liga com o Controller
router.get("/", controller.getProdutos);
router.post("/", controller.criarProduto);
router.delete("/:id", controller.deletarProduto);

module.exports = router;