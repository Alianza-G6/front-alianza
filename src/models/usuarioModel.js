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

function redefinirSenha(email, codigo, novaSenha) {
    console.log("ACESSEI O USUARIO MODEL: ", email, codigo);

    var instrucaoSql = `
        SELECT * FROM tbUsuario AS u
        INNER JOIN tbCodigoUsuario AS c
        ON u.idUsuario = c.fkUsuario
        WHERE u.email = '${email}' AND c.codigo = '${codigo}' AND c.dataExpiracao > NOW();
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)
        .then(result => {
            if (result.length === 1) {
             
                var instrucaoUpdate = `
                    UPDATE tbUsuario 
                    SET senha = '${novaSenha}' 
                    WHERE email = '${email}';
                `;
                console.log("Executando a instrução de UPDATE: \n" + instrucaoUpdate);

                return database.executar(instrucaoUpdate);
            } else if (result.length === 0) {
                return Promise.reject(new Error('E-mail ou código inválidos ou expirados.'));
            } else {
                return Promise.reject(new Error('Mais de um usuário com o mesmo e-mail e código.'));
            }
        })
        .catch(err => {
            console.error('Erro ao verificar o usuário e o código:', err.message);
            return Promise.reject(new Error('Erro ao verificar o usuário e o código.'));
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
function cadastrar(nome, email, senha, codigo, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    console.log("Código de ativação recebido:", codigo); // Verifique se o código está correto
    console.log("CPF recebido:", cpf); // Verifique se o CPF está correto

    // Verificar se o código existe na tabela tbEmpresa
    var selectSql = `SELECT fkEmpresa, COUNT(*) AS codigoExists FROM tbCodigoEmpresa WHERE codigo = '${codigo}' GROUP BY fkEmpresa;
`;
    console.log("Executando a instrução SQL de verificação: \n" + selectSql);

    return database.executar(selectSql)
        .then(result => {
            // Verifica se o código existe
            if (result.length > 0 && result[0].codigoExists > 0) {

                var idEmpresa = result[0].fkEmpresa
                // Código existe, prosseguir com a inserção do usuário
                var instrucaoSql = `
                    INSERT INTO tbUsuario (nome, email, senha, cpf, fkTipoUsuario, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '1', '${idEmpresa}');
                `;
                console.log("Executando a instrução SQL para inserir o usuário: \n" + instrucaoSql);
                return database.executar(instrucaoSql);
            } else {
                // Código não existe, retornar uma mensagem de erro
                console.error(`Código de ativação '${codigo}' inválido ou não encontrado.`);
                throw new Error(`Código de ativação '${codigo}' inválido ou não encontrado.`);
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar usuário:", error.message || error);
            throw error; // Re-throw para que o erro seja tratado no nível superior
        });
}

function buscarUsuarioPorEmail(email) {
    const query = `
        SELECT * FROM tbUsuario WHERE email = '${email}';
    `;
    return database.executar(query);
}

function inserirCodigo(fkUsuario, resetCode) {
    const query = `
        INSERT INTO tbCodigoUsuario (fkUsuario, codigo)
        VALUES (${fkUsuario}, '${resetCode}');
    `;
    return database.executar(query);
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
        SELECT tbUsuario.*, tbTipoUsuario.tipo FROM tbUsuario JOIN tbTipoUsuario ON idTipoUsuario = fkTipoUsuario WHERE fkEmpresa = '${fkEmpresa}' ORDER BY idUsuario;
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
    apagarFunc,
    redefinirSenha, 
    inserirCodigo,
    buscarUsuarioPorEmail
};