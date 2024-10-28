CREATE DATABASE Alianza;

USE Alianza;

-- Tabela que define tipos de empresas (ex.: Companhia Aérea, Aeroporto)
CREATE TABLE tbTipoEmpresa (
    idTipoEmpresa INT PRIMARY KEY,
    tipo VARCHAR(45)
);

insert into tbTipoEmpresa values
(1, 'Companhia Aéra'),
(2, 'Aeroporto');

-- Tabela de empresas, com relação ao tipo de empresa
CREATE TABLE tbEmpresa (
    idEmpresa INT PRIMARY KEY auto_increment,
    razaoSocial VARCHAR(45),
    siglaICAO VARCHAR(3),
    cnpj CHAR(20) UNIQUE,
    codigoAleatorio char(4 )UNIQUE,
    fkTipoEmpresa INT,
    FOREIGN KEY (fkTipoEmpresa) REFERENCES tbTipoEmpresa(idTipoEmpresa)
) ;
select*from tbUsuario;
select*from tbEmpresa;




-- Tabela que define tipos de usuários (ex.: administrador, operador)
CREATE TABLE tbTipoUsuario (
    idTipoUsuario INT PRIMARY KEY,
    tipo VARCHAR(45)
);

insert into tbTipoUsuario values
(1, 'Administrador'),
(2, 'Gerente'),
(3, 'Analista');

-- Tabela de usuários, com relação ao tipo de usuário e à empresa
CREATE TABLE tbUsuario (
    idUsuario INT PRIMARY KEY auto_increment,
    Nome VARCHAR(50) NOT NULL,
	
    Email VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(10) NOT NULL,
    CPF CHAR(11) NOT NULL UNIQUE,
    fkTipoUsuario INT,
    fkEmpresa INT,
    FOREIGN KEY (fkTipoUsuario) REFERENCES tbTipoUsuario(idTipoUsuario),
    FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa)
);

insert into tbUsuario values
(1, 'Moises', 'moises@gmail.com','senha', 1, 1);
select*from tbUsuario
;

INSERT INTO tbEmpresa (razaoSocial, siglaICAO, cnpj, codigoAleatorio, fkTipoEmpresa)
VALUES ('Empresa Teste', 'ETC', '12345678901234', '1234', 1);
 SELECT idUsuario, nome, email FROM tbUsuario WHERE email = 'moises123@gmail.com' AND senha = 'abc';



delete from tbUsuario where nome = 'felipe' and senha ='felipe';
-- Tabela de aeroportos
CREATE TABLE tbAeroporto (
    idAeroporto INT PRIMARY KEY,
    nome VARCHAR(45),
    siglaICAO VARCHAR(3)
);

-- Tabela de companhias aéreas
CREATE TABLE tbCompanhia (
    idCompanhia INT PRIMARY KEY,
    nome VARCHAR(45),
    siglaICAO VARCHAR(3)
);

-- Tabela que define o status do voo
CREATE TABLE tbStatusVoo (
    idStatusVoo INT PRIMARY KEY,
    status VARCHAR(20) NOT NULL
);

-- Tabela de voos
CREATE TABLE voo (
    idVoo INT PRIMARY KEY,
    fkCompanhia INT,
    FOREIGN KEY (fkCompanhia) REFERENCES tbCompanhia(idCompanhia),
    numeroVoo VARCHAR(10),
    fkAeroportoOrigem INT,
    FOREIGN KEY (fkAeroportoOrigem) REFERENCES tbAeroporto(idAeroporto),
    partidaPrevista DATETIME,
    partidaReal DATETIME,
    fkAeroportoDestino INT,
    FOREIGN KEY (fkAeroportoDestino) REFERENCES tbAeroporto(idAeroporto),
    chegadaPrevista DATETIME,
    chegadaReal DATETIME,
    fkStatusVoo INT,
    FOREIGN KEY (fkStatusVoo) REFERENCES tbStatusVoo(idStatusVoo)
);

SELECT v.idVoo, 
       c.nome AS Companhia, 
       a1.nome AS AeroportoSaida, 
       a2.nome AS AeroportoChegada, 
       v.partidaPrevista, 
       v.partidaReal, 
       v.chegadaPrevista, 
       v.chegadaReal, 
       s.status AS SituacaoVoo
FROM voo v
JOIN tbCompanhia c ON v.fkCompanhia = c.idCompanhia
JOIN tbAeroporto a1 ON v.fkAeroportoOrigem = a1.idAeroporto
JOIN tbAeroporto a2 ON v.fkAeroportoDestino = a2.idAeroporto
JOIN tbStatusVoo s ON v.fkStatusVoo = s.idStatusVoo;

SELECT u.Nome AS Funcionario, 
       u.Cargo, 
       e.razaoSocial AS Empresa
FROM tbUsuario u
JOIN tbEmpresa e ON u.fkEmpresa = e.idEmpresa
JOIN tbTipoEmpresa te ON e.fkTipoEmpresa = te.idTipoEmpresa
WHERE te.tipo = 'Aeroporto';  -- Ou 'Companhia Aérea', dependendo do caso.