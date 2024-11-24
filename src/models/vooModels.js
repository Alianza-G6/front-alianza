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
            TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30  -- Atraso na partida
            AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30
            AND fkCompanhia = ${fkEmpresaVar} -- Atraso na chegada
        GROUP BY 
            p.fkCompanhia
        HAVING 
            COUNT(*) > 1;  -- Considera a rota como problemática se houver mais de um atraso
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRotasProblematicas(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        SELECT 
            p.numeroVoo, 
            p.fkCompanhia,
            c.siglaICAO AS companhia, 
            p.fkAeroportoOrigem,
            o.siglaICAO AS aeroportoOrigem,
            p.fkAeroportoDestino,
            d.siglaICAO AS aeroportoDestino,
            COUNT(*) AS quantidadeAtrasos,
            ROUND(AVG(TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal)), 0) AS mediaAtrasoPartida,
            ROUND(AVG(TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal)), 0) AS mediaAtrasoChegada
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        JOIN 
            tbAeroporto o ON p.fkAeroportoOrigem = o.idAeroporto
        JOIN 
            tbAeroporto d ON p.fkAeroportoDestino = d.idAeroporto
        WHERE 
            TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30  -- Atraso na partida
            AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30  -- Atraso na chegada
            AND fkCompanhia = ${fkEmpresaVar}  -- ID da companhia específica
        GROUP BY 
            p.numeroVoo, p.fkCompanhia, c.siglaICAO, p.fkAeroportoOrigem, o.siglaICAO, 
            p.fkAeroportoDestino, d.siglaICAO
        HAVING 
            COUNT(*) > 1  -- Considera a rota como problemática se houver mais de um atraso
        ORDER BY 
            quantidadeAtrasos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarVoo(idVoo, dataVoo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", idVoo, dataVoo)

    var instrucaoSql = `
        SELECT 
            p.numeroVoo,
            p.fkCompanhia,
            c.siglaICAO AS companhia, 
            p.fkAeroportoOrigem,
            o.siglaICAO AS aeroportoOrigem,
            p.fkAeroportoDestino,
            d.siglaICAO AS aeroportoDestino,
            p.partidaPrevista AS partidaPrevista, 
            p.partidaReal AS partidaReal, 
            p.chegadaPrevista AS chegadaPrevista, 
            p.chegadaReal AS chegadaReal,
            p.statusVoo
        FROM 
            voo p
        JOIN 
            tbCompanhia c ON p.fkCompanhia = c.idCompanhia
        JOIN 
            tbAeroporto o ON p.fkAeroportoOrigem = o.idAeroporto
        JOIN 
            tbAeroporto d ON p.fkAeroportoDestino = d.idAeroporto
        WHERE 
            p.numeroVoo = '${idVoo}'  -- Substitua pelo número do voo desejado
            AND DATE(p.partidaPrevista) = '${dataVoo}'  -- Substitua pela data desejada
        ORDER BY 
            p.partidaPrevista ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpiPercentualVooPontual,
    kpiPercentualVooAtrasado,
    kpiMediaAtrasosSaida,
    kpiMediaAtrasosChegada,
    kpiRotasProblematicas,
    listarRotasProblematicas,
    pesquisarVoo
};