const express = require("express");
const router = express.Router();
const controller = require("../controllers/produtoController");

router.get("/", controller.getProdutos);
router.post("/", controller.criarProduto);
router.delete("/:id", controller.deletarProduto);

module.exports = router;
