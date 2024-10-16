var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, fkTipoUsuario, fkEmpresa FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function emailNovo(email, senha, novoEmail) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function emailNovo(): ", email, senha);

    var instrucaoSql = `
        UPDATE tbUsuario SET email = '${novoEmail}' WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [novoEmail, email, senha])
        .then(result => {
            // Verifica se nenhuma linha foi afetada (ou seja, email ou senha incorretos)
            if (result.affectedRows === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            }
            return 'Email atualizado com sucesso!';
        })
        .catch(err => {
            console.error('Erro ao atualizar email:', err.message);
            return Promise.reject(new Error('Erro ao atualizar o email.'));
        });
}


function deletarConta(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function emailNovo(): ", email, senha);

    var instrucaoSql = `
         delete from tbUsuario where email = '${email}' and senha ='${senha}';;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha])
        .then(result => {
            // Verifica se nenhuma linha foi afetada (ou seja, email ou senha incorretos)
            if (result.affectedRows === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            }
            return 'Email atualizado com sucesso!';
        })
        .catch(err => {
            console.error('Erro ao atualizar email:', err.message);
            return Promise.reject(new Error('Erro ao atualizar o email.'));
        });
}



function senhaNova(email, senha, novoSenha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function emailNovo(): ", email, senha);

    var instrucaoSql = `
        UPDATE tbUsuario SET senha= '${novoSenha}' WHERE email= '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [novoSenha, email, senha])
        .then(result => {
            // Verifica se nenhuma linha foi afetada (ou seja, email ou senha incorretos)
            if (result.affectedRows === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            }
            return 'Email atualizado com sucesso!';
        })
        .catch(err => {
            console.error('Erro ao atualizar email:', err.message);
            return Promise.reject(new Error('Erro ao atualizar a senha.'));
        });
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, tipoUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, email, senha, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFunc(nome, email, senha, tipoUsuario, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, tipoUsuario, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, email, senha, fkTipoUsuario, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    emailNovo,
    senhaNova,
    deletarConta,
    cadastrarFunc
};