var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function kpiPercentualVooPontual(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
-- Percentual de voos pontuais considerando novas regras
SELECT 
    c.nome,
    ROUND(
        (
            COUNT(
                CASE 
                    WHEN (
                        -- Condição 1: Saída e chegada antes do horário previsto
                        TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) <= 0
                        AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) <= 0
                    ) OR (
                        -- Condição 2: Saída e chegada até 30 minutos depois do horário previsto
                        TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) <= 30
                        AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) <= 30
                    ) OR (
                        -- Condição 3: Saída atrasada, mas chegada até 30 minutos depois ou antes do horário previsto
                        TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 0
                        AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) <= 30
                    ) 
                    THEN 1 
                    ELSE NULL 
                END
            ) / COUNT(p.idVoo)
        ) * 100, 2
    ) AS percentualPontuais
FROM 
    voo p
JOIN 
    tbCompanhia c ON p.fkCompanhia = c.idCompanhia
WHERE 
    p.fkCompanhia = ${fkEmpresaVar}  -- Aqui você coloca o ID da companhia que você deseja
    AND p.partidaReal IS NOT NULL
    AND p.partidaPrevista IS NOT NULL
    AND p.chegadaReal IS NOT NULL
    AND p.chegadaPrevista IS NOT NULL
GROUP BY 
    c.nome;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiPercentualVooAtrasado(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
-- Percentual de voos atrasados
SELECT 
    c.nome,
    ROUND(
        (
            COUNT(
                CASE
                    WHEN (
                        -- Saída e chegada com mais de 30 minutos de atraso
                        TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30
                        AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30
                    ) OR (
                        -- Saída pontual e chegada com mais de 30 minutos de atraso
                        TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) <= 0
                        AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30
                    )
                    THEN 1 
                    ELSE NULL 
                END
            ) / COUNT(p.idVoo)
        ) * 100, 2
    ) AS percentualAtrasados
FROM 
    voo p
JOIN 
    tbCompanhia c ON p.fkCompanhia = c.idCompanhia
WHERE 
    p.fkCompanhia = ${fkEmpresaVar}  -- Substitua pelo ID da companhia desejada
    AND p.partidaReal IS NOT NULL
    AND p.partidaPrevista IS NOT NULL
    AND p.chegadaReal IS NOT NULL
    AND p.chegadaPrevista IS NOT NULL
    AND p.statusVoo != 'cancelado' -- Exclui voos cancelados
GROUP BY 
    c.nome;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaAtrasosSaida(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        -- Média de atrasos na saída
        SELECT 
            c.nome AS nomeCompanhia,
            ROUND(AVG(
                CASE 
                    -- Considere apenas atrasos na saída (tempo positivo)
                    WHEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 0 
                        THEN TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal)
                    ELSE NULL -- Ignora casos sem atraso
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
            AND p.statusVoo != 'cancelado'  -- Exclui voos cancelados
        GROUP BY 
            c.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMediaAtrasosChegada(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        -- Média de atrasos na chegada
        SELECT 
            c.nome AS nomeCompanhia,
            ROUND(AVG(
                CASE 
                    -- Considere apenas atrasos na chegada (tempo positivo)
                    WHEN TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 0 
                        THEN TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal)
                    ELSE NULL -- Ignora casos sem atraso
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
            AND p.statusVoo != 'cancelado'  -- Exclui voos cancelados
        GROUP BY 
            c.nome;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiRotasProblematicas(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        -- Rotas problemáticas com mais de um atraso
        SELECT 
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
            -- Regra de atraso na partida e chegada (mais de 30 minutos de atraso)
            TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30  
            AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30  
            AND p.fkCompanhia = ${fkEmpresaVar}  -- ID da companhia específica
            AND p.statusVoo != 'cancelado'  -- Exclui voos cancelados
            AND p.partidaReal IS NOT NULL 
            AND p.partidaPrevista IS NOT NULL
            AND p.chegadaReal IS NOT NULL
            AND p.chegadaPrevista IS NOT NULL
        GROUP BY 
            p.fkCompanhia, 
            c.siglaICAO, 
            p.fkAeroportoOrigem, 
            o.siglaICAO, 
            p.fkAeroportoDestino, 
            d.siglaICAO
        HAVING 
            COUNT(*) > 1  -- A rota deve apresentar mais de um atraso para ser considerada problemática
        ORDER BY 
            quantidadeAtrasos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRotasProblematicas(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

    var instrucaoSql = `
        -- Rotas problemáticas com mais de um atraso
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
            -- Regra de atraso na partida e chegada (mais de 30 minutos de atraso)
            TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30  
            AND TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaRe'al) > 30  
            AND p.fkCompanhia = ${fkEmpresaVar}  -- ID da companhia específica
            AND p.statusVoo != 'cancelado'  -- Exclui voos cancelados
            AND p.partidaReal IS NOT NULL 
            AND p.partidaPrevista IS NOT NULL
            AND p.chegadaReal IS NOT NULL
            AND p.chegadaPrevista IS NOT NULL
        GROUP BY 
            p.numeroVoo,
            p.fkCompanhia, 
            c.siglaICAO, 
            p.fkAeroportoOrigem, 
            o.siglaICAO, 
            p.fkAeroportoDestino, 
            d.siglaICAO
        HAVING 
            COUNT(*) > 1  -- A rota deve apresentar mais de um atraso para ser considerada problemática
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

function pegarMediasParaGrafico(fkEmpresaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >>verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de sei BD está rodando corretamente. \n\n function listarFunc():", fkEmpresaVar)

        var instrucaoSql = `
SELECT 
	WEEK(p.partidaPrevista, 1) AS semanaDoAno, -- Número da semana no ano
	COUNT(CASE 
			WHEN (p.chegadaPrevista IS NULL) OR 
				((TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) <= 30) AND 
				(TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) <= 30))
			THEN 1 
			ELSE NULL 
		END) AS totalPontuais,
	COUNT(CASE 
			WHEN (p.chegadaPrevista IS NOT NULL AND 
				((TIMESTAMPDIFF(MINUTE, p.partidaPrevista, p.partidaReal) > 30) OR 
					(TIMESTAMPDIFF(MINUTE, p.chegadaPrevista, p.chegadaReal) > 30)))
			THEN 1 
			ELSE NULL 
		END) AS totalAtrasados
FROM 
	voo p
WHERE 
	p.fkCompanhia = ${fkEmpresaVar} -- ID da companhia específica
	AND p.partidaReal IS NOT NULL
	AND MONTH(p.partidaPrevista) = 11 -- Mês desejado (ex.: 11 para novembro)
	AND YEAR(p.partidaPrevista) = 2022 -- Ano desejado (ex.: 2024)
GROUP BY 
	WEEK(p.partidaPrevista, 1) -- Agrupa por número da semana no ano
ORDER BY WEEK(p.partidaPrevista, 1);
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
    pesquisarVoo,
    pegarMediasParaGrafico
};