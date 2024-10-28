var express = require("express");
var router = express.Router();

var feedbackController = require("../controllers/feedbackController");

router.post("/enviarFeedback", function (req, res) {
    feedbackController.enviarFeedback(req, res);
});

router.get("/pegarDados/:idFeedback", function (req, res) {
    feedbackController.pegarDados(req, res);
});

router.get("/listarFeedback/:idUsuario", function (req, res) {
    feedbackController.listarFeedback(req, res);
});

router.put("/editarFeedback/", function (req, res) {
    feedbackController.editarFeedback(req, res)
});

router.delete("/apagarFeedback/", function (req, res) {
    feedbackController.apagarFeedback(req, res)
});

module.exports = router;