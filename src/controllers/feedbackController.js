var feedbackModel = require("../models/feedbackModel");

function enviarFeedback(req, res) {
   
    var idUsuario = req.body.usuarioServer;
    var feedbackResumo = req.body.feedbackResumoServer;
    var feedback = req.body.feedbackServer;
   

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if(feedbackResumo == undefined) {
        res.status(400).send("Seu feedbackResumo está undefined!")
    }else if(feedback == undefined) {
        res.status(400).send("Seu feedback está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        feedbackModel.enviarFeedback(feedbackResumo ,feedback, idUsuario)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarFeedback(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        feedbackModel.listarFeedback(idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: listarFeedback ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function pegarDados(req, res) {
    let idFeedback = req.params.idFeedback;

    if (idFeedback == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        feedbackModel.pegarDados(idFeedback)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: pegarDados ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function editarFeedback(req, res) {
    var feedbackResumo = req.body.feedbackResumoServer;
    var feedback = req.body.feedbackServer;
    var idFeedback = req.body.idFeedbackServer;

    // Faça as validações dos valores
    if(feedbackResumo == undefined) {
        res.status(400).send("Seu idUsuario está undefined!")
    } else if(feedback == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if(idFeedback == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        feedbackModel.editarFeedback(feedbackResumo, feedback, idFeedback)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function apagarFeedback(req, res) {
    
    var idFeedback = req.body.idFeedbackServer;
  

    // Faça as validações dos valores
    if(idFeedback == undefined) {
        res.status(400).send("Seu idUsuario está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        feedbackModel.apagarFeedback(idFeedback)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o apagarFeedback! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    enviarFeedback,
    pegarDados,
    listarFeedback,
    editarFeedback,
    apagarFeedback,
}