var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/emailNovo", function (req, res) {
    usuarioController.emailNovo(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/cadastrarFunc", function (req, res) {
    usuarioController.cadastrarFunc(req, res);
});

router.get("/listarFunc/:fkEmpresaVar", function (req, res) {
    usuarioController.listarFunc(req, res);
});

router.get("/pegarDados/:fkEmpresaVar/:idUsuarioEspecifico", function (req, res) {
    usuarioController.listarFunc(req, res);
});

router.put("/editarFunc/", function (req, res) {
    usuarioController.editarFunc(req, res)
});

router.delete("/apagarFunc/", function (req, res) {
    usuarioController.apagarFunc(req, res)
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/senhaNova", function (req, res) {
    usuarioController.senhaNova(req, res);
});
router.post("/deletarConta", function (req, res) {
    usuarioController.deletarConta(req, res);
});


module.exports = router;