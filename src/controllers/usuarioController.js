var usuarioModel = require("../models/usuarioModel");



    function redefinirSenha  (req, res)  {
    const { email, codigo, novaSenha } = req.body;

    if (!email || !codigo || !novaSenha) {
        return res.status(400).json({ error: 'E-mail, código e nova senha são obrigatórios!' });
    }

    usuarioModel.redefinirSenha(email, codigo, novaSenha)
        .then(resultado => {
            if (resultado.affectedRows === 1) {
                console.log("Senha atualizada com sucesso.");
                return res.status(200).json({
                    message: 'Senha atualizada com sucesso!',
                    email: email
                });
            } else {
                return res.status(403).send("Erro ao atualizar a senha.");
            }
        })
        .catch(erro => {
            console.error("\nHouve um erro ao redefinir a senha: ", erro.message);
            return res.status(500).json({ error: erro.message });
        });
};



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
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            fk_tipoUsuario: resultadoAutenticar[0].fkTipoUsuario,
                            fk_empresa: resultadoAutenticar[0].fkEmpresa,
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
    var cpf = req.body.cpfServer;
    var codigo = req.body.codigoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

    
        usuarioModel.cadastrar(nome, email, senha, codigo,cpf)
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

function cadastrarFunc(req, res) {
   
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUserServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if(cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (tipoUsuario == undefined) {
        res.status(400).send("Seu tipoUsuario está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFunc(nome, cpf, email, senha, tipoUsuario, fkEmpresa)

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


function listarFunc(req, res) {
    var fkEmpresa = req.params.fkEmpresaVar;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        usuarioModel.listarFunc(fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro: listarFunc ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function pegarDados(req, res) {
    let fkEmpresa = req.params.fkEmpresaVar;
    let idUsuario = req.params.idUsuarioEspecifico;

    if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if(idUsuario == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {

        usuarioModel.listarFunc(fkEmpresa, idUsuario)
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


function editarFunc(req, res) {
    
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = req.body.tipoUserServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if(idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!")
    } else if(nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if(cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (tipoUsuario == undefined) {
        res.status(400).send("Seu tipoUsuario está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.editarFunc(idUsuario, nome, cpf, email, senha, tipoUsuario, fkEmpresa)

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

function apagarFunc(req, res) {
    
    var idUsuario = req.body.idUsuarioServer;
    var idEmpresa = req.body.idEmpresaServer;
  

    // Faça as validações dos valores
    if(idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!")
    }else if(idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined")
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.apagarFunc(idUsuario, idEmpresa)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o apagarFunc! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function cadastrarEmpresa(req, res) {
   var codigoGerado = req.body.codigoGeradoServer;
   var razaoSocial = req.body.razaoSocialServer;
   var cnpjCadastro= req.body.cnpjCadastroServer;
   var tipoEmpresa = req.body.tipoEmpresaServer;
   var siglaIcao= req.body.siglaIcaoServer;

    // Faça as validações dos valores
    if (razaoSocial == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpjCadastro == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (tipoEmpresa == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } 
    
 else if (siglaIcao == undefined) {
    res.status(400).send("Sua senha está undefined!");
}
    
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(razaoSocial, cnpjCadastro, tipoEmpresa, siglaIcao, codigoGerado)
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
    cadastrarFunc,
    senhaNova,
    deletarConta,
    listarFunc,
    pegarDados,
    editarFunc,
    apagarFunc,
    cadastrarEmpresa,
    redefinirSenha
}