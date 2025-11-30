const express = require("express");
const router = express.Router();
const controller = require("../controllers/insumoController");

router.get("/", controller.getInsumos);
router.post("/", controller.criarInsumo);
router.delete("/:id", controller.deletarInsumo);

module.exports = router;