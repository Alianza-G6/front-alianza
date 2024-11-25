var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {
    var codigoGerado = req.body.codigoGeradoServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpjCadastro = req.body.cnpjCadastroServer;
    var tipoEmpresa = req.body.tipoEmpresaServer;
    var siglaIcao = req.body.siglaIcaoServer;

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpjCadastro == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tipoEmpresa == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (siglaIcao == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (codigoGerado == undefined) {
        res.status(400).send("Seu codigoGerado está undefined!");
    }

    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.cadastrarEmpresa(razaoSocial, cnpjCadastro, tipoEmpresa, siglaIcao, codigoGerado)
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

function listarEmpresas(req, res) {
    var tipoEmpresa = req.params.tipoEmpresa;

    if (tipoEmpresa == undefined) {
        res.status(400).send("Seu tipoEmpresa está undefined!");
    } else {

        empresaModel.listarEmpresas(tipoEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: listarEmpresas ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function pegarDados(req, res) {
    let idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else {

        empresaModel.pegarDados(idEmpresa)
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


function editarEmpresa(req, res) {
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var empresaStatus = req.body.empresaStatusServer;
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Seu razaoSocial está undefined!")
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (empresaStatus == undefined) {
        res.status(400).send("Seu empresaStatus está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.editarEmpresa(razaoSocial, cnpj, empresaStatus, idEmpresa)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o editarEmpresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function apagarEmpresa(req, res) {

    var idFeedback = req.body.idFeedbackServer;


    // Faça as validações dos valores
    if (idFeedback == undefined) {
        res.status(400).send("Seu idUsuario está undefined!")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.apagarEmpresa(idFeedback)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o apagarEmpresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrarEmpresa,
    listarEmpresas,
    editarEmpresa,
    apagarEmpresa,
    pegarDados,
}