var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

router.get("/pegarDados/:idEmpresa", function (req, res) {
    empresaController.pegarDados(req, res);
});

router.get("/listarEmpresas/:tipoEmpresa", function (req, res) {
    empresaController.listarEmpresas(req, res);
});

router.put("/editarEmpresa/", function (req, res) {
    empresaController.editarEmpresa(req, res)
});

router.delete("/apagarEmpresa/", function (req, res) {
    empresaController.apagarEmpresa(req, res)
});

module.exports = router;