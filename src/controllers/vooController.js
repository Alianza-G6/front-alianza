var vooModels = require("../models/vooModels");

function kpiPercentualVooPontual(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.kpiPercentualVooPontual(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiPercentualVooPontual ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function kpiPercentualVooAtrasado(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.kpiPercentualVooAtrasado(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiPercentualVooAtrasado ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function kpiMediaAtrasosSaida(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.kpiMediaAtrasosSaida(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiMediaAtrasos ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function kpiMediaAtrasosChegada(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.kpiMediaAtrasosChegada(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiMediaAtrasos ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function kpiRotasProblematicas(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.kpiRotasProblematicas(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiRotasProblematicas ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarRotasProblematicas(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar;

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.listarRotasProblematicas(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: kpiRotasProblematicas ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function pesquisarVoo(req, res) {
    let idVoo = req.params.idVoo;
    let dataVoo = req.params.dataVoo;

    if (idVoo == undefined) {
        res.status(400).send("Seu idVoo está undefined!");
    }
    else if (dataVoo == undefined){
        res.status(400).send("Seu dataVoo está undefined")
    } else {

        vooModels.pesquisarVoo(idVoo, dataVoo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: pesquisarVoo ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function pegarMediasParaGrafico(req, res) {
    let fkEmpresaVar = req.params.fkEmpresaVar

    if (fkEmpresaVar == undefined) {
        res.status(400).send("Seu fkEmpresaVar está undefined!");
    } else {

        vooModels.pegarMediasParaGrafico(fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: pegarMediasParaGrafico ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    kpiPercentualVooPontual,
    kpiPercentualVooAtrasado,
    kpiMediaAtrasosSaida,
    kpiMediaAtrasosChegada,
    kpiRotasProblematicas,
    listarRotasProblematicas,
    pesquisarVoo,
    pegarMediasParaGrafico
}