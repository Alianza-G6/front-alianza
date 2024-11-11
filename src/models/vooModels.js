var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function kpiPercentualVooPontual(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        SELECT 
            c.nome,
            round((COUNT(CASE 
                    WHEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) = 0 THEN 1
                    ELSE NULL
                END) / COUNT(p.idVoo)) * 100, 2) AS percentualPontuais
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        WHERE 
            p.fkCompanhia = ${fkEmpresaVar}  -- Aqui você coloca o id da companhia que você deseja
            AND p.partidaReal IS NOT NULL
            AND p.partidaPrevista IS NOT NULL
        GROUP BY 
            c.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiPercentualVooAtrasado(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        SELECT 
            c.nome,
            round((COUNT(CASE 
                    WHEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 0 THEN 1
                    ELSE NULL
                END) / COUNT(p.idVoo)) * 100, 2) AS percentualAtrasados
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        WHERE 
            p.fkCompanhia = ${fkEmpresaVar} -- Aqui você coloca o id da companhia que você deseja
            AND p.partidaReal IS NOT NULL
            AND p.partidaPrevista IS NOT NULL
        GROUP BY 
            c.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaAtrasosSaida(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
       SELECT 
            c.nome AS nomeCompanhia,
            ROUND(AVG(
                CASE 
                    WHEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 0 
                        THEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) 
                    ELSE 0 
                END
            ), 2) AS mediaAtrasoSaida
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        WHERE 
            p.fkCompanhia = ${fkEmpresaVar}  -- ID da companhia desejada
            AND p.partidaReal IS NOT NULL
            AND p.partidaPrevista IS NOT NULL
        GROUP BY 
            c.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaAtrasosChegada(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        SELECT 
            c.nome AS nomeCompanhia,
            ROUND(AVG(
                CASE 
                    WHEN TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 0 
                        THEN TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) 
                    ELSE 0 
                END
            ), 2) AS mediaAtrasoChegada
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        WHERE 
            p.fkCompanhia = ${fkEmpresaVar}  -- ID da companhia desejada
            AND p.chegadaReal IS NOT NULL
            AND p.chegadaPrevista IS NOT NULL
        GROUP BY 
            c.nome;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiRotasProblematicas(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        SELECT 
            COUNT(*) AS quantidadeAtrasos
        FROM 
            voo p
        WHERE 
            TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 0  -- Atraso na partida
            AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 0
            AND fkCompanhia = ${fkEmpresaVar} -- Atraso na chegada
        GROUP BY 
            p.fkCompanhia
        HAVING 
            COUNT(*) > 1;  -- Considera a rota como problemática se houver mais de um atraso
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpiPercentualVooPontual,
    kpiPercentualVooAtrasado,
    kpiMediaAtrasosSaida,
    kpiMediaAtrasosChegada,
    kpiRotasProblematicas
};