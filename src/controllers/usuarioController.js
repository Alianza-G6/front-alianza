var usuarioModel = require("../models/usuarioModel");




function emailNovo(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var novoEmail = req.body.emailNovoServer;
 
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.emailNovo(email, senha, novoEmail)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultado do UPDATE: ${JSON.stringify(resultadoAutenticar)}`);

                 
                    if (resultadoAutenticar.affectedRows === 1) {
                        console.log("Email atualizado com sucesso.");
                        res.json({
                            id: resultadoAutenticar.insertId,
                            email: novoEmail,
                            senha: senha
                        });
                    } else {
                        res.status(403).send("Email ou senha incorretos.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a atualização! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
} 




function senhaNova(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var novaSenha = req.body.senhaNovaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } 
    else {

        usuarioModel.senhaNova(email, senha, novaSenha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultado do UPDATE: ${JSON.stringify(resultadoAutenticar)}`);

             
                if (resultadoAutenticar.affectedRows === 1) {
                    console.log("Senha atualizado com sucesso.");
                    res.json({
                        id: resultadoAutenticar.insertId,
                        email: email,
                        senha: novaSenha
                    });
                } else {
                    res.status(403).send("Email ou senha incorretos.");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a atualização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}


function deletarConta(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
 

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } 
    else {

        usuarioModel.deletarConta(email, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultado do UPDATE: ${JSON.stringify(resultadoAutenticar)}`);

             
                if (resultadoAutenticar.affectedRows === 1) {
                    console.log("Conta deletada com sucesso.");
                    res.json({
                        id: resultadoAutenticar.insertId,
                        email: email,
                        senha: senha
                    });
                } else {
                    res.status(403).send("Email ou senha incorretos.");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao apagar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }

}





function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        
                        res.json({
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                        });
                    
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}






function cadastrar(req, res) {
   
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUserServer;
    var companhia = req.body.siglaCompanhiaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, tipoUsuario, companhia)
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

module.exports = {
    autenticar,
    emailNovo,
    cadastrar,
    senhaNova,
    deletarConta
}