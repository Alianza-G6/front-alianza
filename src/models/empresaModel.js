var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarEmpresa(razaoSocial, cnpjCadastro, tipoEmpresa, siglaIcao, codigoGerado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, cnpjCadastro, tipoEmpresa, siglaIcao, codigoGerado);

    // Inserir a empresa
    var instrucaoSql1 = `
        INSERT INTO tbEmpresa (razaoSocial, cnpj, siglaICAO, fkTipoEmpresa, empresaStatus)
        VALUES ('${razaoSocial}', '${cnpjCadastro}', '${siglaIcao}', '${tipoEmpresa}', 'Ativa');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql1);

    return database.executar(instrucaoSql1)
        .then(() => {
            // Recuperar o ID da empresa recém-inserida
            var instrucaoSql2 = `
                SELECT idEmpresa FROM tbEmpresa WHERE cnpj = '${cnpjCadastro}';
            `;
            console.log("Executando a instrução SQL: \n" + instrucaoSql2);
            return database.executar(instrucaoSql2);
        })
        .then(result => {
            if (!result || result.length === 0) {
                throw new Error("Empresa não encontrada após o cadastro.");
            }

            // Recuperar o ID da empresa
            var idEmpresa = result[0].idEmpresa;
            console.log("ID da empresa recuperado:", idEmpresa);

            // Inserir o código relacionado à empresa
            var instrucaoSql3 = `
                INSERT INTO tbCodigoEmpresa (fkEmpresa, codigo)
                VALUES ('${idEmpresa}', '${codigoGerado}');
            `;
            console.log("Executando a instrução SQL para inserir o código: \n" + instrucaoSql3);
            return database.executar(instrucaoSql3);
        })
        // .then(() => {
        //     console.log("Empresa e código cadastrados com sucesso!");

        // })
        // .catch(error => {
        //     console.error("Erro ao cadastrar empresa:", error.message || error);
        //     throw error; // Re-lançar o erro para tratamento em nível superior
        // });
}


function pegarDados(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", idEmpresa)

    var instrucaoSql = `
        SELECT tbEmpresa.* FROM tbEmpresa WHERE idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEmpresas(tipoEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", tipoEmpresa)

    var instrucaoSql = `
        SELECT * from tbEmpresa WHERE fkTipoEmpresa = '${tipoEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql); 
    return database.executar(instrucaoSql);
}

function editarEmpresa(razaoSocial, cnpj, empresaStatus, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, cnpj, empresaStatus, idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE tbEmpresa SET razaoSocial = '${razaoSocial}', cnpj = '${cnpj}', empresaStatus = '${empresaStatus}' WHERE idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function apagarEmpresa(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        DELETE FROM tbEmpresa WHERE idEmpresa = ${idEmpresa}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    listarEmpresas,
    pegarDados,
    editarEmpresa,
    apagarEmpresa
};