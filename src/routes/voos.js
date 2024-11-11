var express = require("express");
var router = express.Router();

var vooController = require("../controllers/vooController");

router.get("/kpiPercentualVooPontual/:fkEmpresaVar", function (req, res) {
    vooController.kpiPercentualVooPontual(req, res);
});

router.get("/kpiPercentualVooAtrasado/:fkEmpresaVar", function (req, res) {
    vooController.kpiPercentualVooAtrasado(req, res);
});

router.get("/kpiMediaAtrasosSaida/:fkEmpresaVar", function (req, res) {
    vooController.kpiMediaAtrasosSaida(req, res);
});

router.get("/kpiMediaAtrasosChegada/:fkEmpresaVar", function (req, res) {
    vooController.kpiMediaAtrasosChegada(req, res);
});

router.get("/kpiRotasProblematicas/:fkEmpresaVar", function (req, res) {
    vooController.kpiRotasProblematicas(req, res);
});

module.exports = router;