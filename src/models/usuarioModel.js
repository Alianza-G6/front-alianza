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
    SELECT * FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}';
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(result => {
            if (result.length === 1) {
               
                var instrucaoUpdate = `
                UPDATE tbUsuario SET email = '${novoEmail}' WHERE email = '${email}' AND senha = '${senha}';
            `;
                console.log("Executando a instrução de UPDATE: \n" + instrucaoUpdate);
                return database.executar(instrucaoUpdate);
            } else if (result.length === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            } else {
                return Promise.reject(new Error('Mais de um usuário com o mesmo login e senha.'));
            }
        })
        .catch(err => {
            console.error('Erro ao verificar o usuário:', err.message);
            return Promise.reject(new Error('Erro ao verificar o usuário.'));
        });

    }


function deletarConta(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function emailNovo(): ", email, senha);

    var instrucaoSql = `
    SELECT * FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}';
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(result => {
            if (result.length === 1) {
               
                var instrucaoUpdate = `
                delete from tbUsuario WHERE email = '${email}' AND senha = '${senha}';
            `;
                console.log("Executando a instrução de UPDATE: \n" + instrucaoUpdate);
                return database.executar(instrucaoUpdate);
            } else if (result.length === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            } else {
                return Promise.reject(new Error('Mais de um usuário com o mesmo login e senha.'));
            }
        })
        .catch(err => {
            console.error('Erro ao verificar o usuário:', err.message);
            return Promise.reject(new Error('Erro ao verificar o usuário.'));
        });
}



function senhaNova(email, senha, novoSenha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function emailNovo(): ", email, senha);

    var instrucaoSql = `
    SELECT * FROM tbUsuario WHERE email = '${email}' AND senha = '${senha}';
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(result => {
            if (result.length === 1) {
               
                var instrucaoUpdate = `
                UPDATE tbUsuario SET senha = '${novoSenha}' WHERE email = '${email}' AND senha = '${senha}';
            `;
                console.log("Executando a instrução de UPDATE: \n" + instrucaoUpdate);
                return database.executar(instrucaoUpdate);
            } else if (result.length === 0) {
                return Promise.reject(new Error('Email ou senha incorretos.'));
            } else {
                return Promise.reject(new Error('Mais de um usuário com o mesmo login e senha.'));
            }
        })
        .catch(err => {
            console.error('Erro ao verificar o usuário:', err.message);
            return Promise.reject(new Error('Erro ao verificar o usuário.'));
        });
}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, tipoUsuario, companhia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, email, senha, fkTipoUsuario, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', '${companhia}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFunc(nome, email, senha, tipoUsuario, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFunc():", nome, email, senha, tipoUsuario, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, email, senha, fkTipoUsuario, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarFunc(fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresa)

    var instrucaoSql = `
        SELECT tbUsuario.*, tbTipoUsuario.tipo FROM tbUsuario JOIN tbTipoUsuario ON idTipoUsuario = fkTipoUsuario WHERE fkEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDados(fkEmpresa, idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresa, idUsuario)

    var instrucaoSql = `
        SELECT tbUsuario.* FROM tbUsuario JOIN tbTipoUsuario ON idTipoUsuario = fkTipoUsuario WHERE fkEmpresa = '${fkEmpresa}' AND idUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFunc(nome, cpf, email, senha, tipoUsuario, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, email, senha, tipoUsuario, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbUsuario (nome, cpf, email, senha, fkTipoUsuario, fkEmpresa) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', '${tipoUsuario}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarFunc(idUsuario, nome, cpf, email, senha, tipoUsuario, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",idUsuario, nome, cpf, email, senha, tipoUsuario, fkEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE tbUsuario SET nome = '${nome}', cpf = '${cpf}', email = '${email}', senha = '${senha}', fkTipoUsuario = '${tipoUsuario}', fkEmpresa = '${fkEmpresa}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function apagarFunc(idUsuario,idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",idUsuario, idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        DELETE FROM tbUsuario WHERE idUsuario = ${idUsuario} AND fkEmpresa = ${idEmpresa}
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
    cadastrarFunc,
    listarFunc,
    pegarDados,
    editarFunc,
    apagarFunc
};