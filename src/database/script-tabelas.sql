CREATE DATABASE Alianza;

USE Alianza;

-- Tabela que define tipos de empresas (ex.: Companhia Aérea, Aeroporto)
CREATE TABLE tbTipoEmpresa (
    idTipoEmpresa INT PRIMARY KEY,
    tipo VARCHAR(45)
);

-- Tabela de empresas, com relação ao tipo de empresa
CREATE TABLE tbEmpresa (
    idEmpresa INT PRIMARY KEY auto_increment,
    razaoSocial VARCHAR(45),
    siglaICAO VARCHAR(3),
    cnpj CHAR(20) UNIQUE,
    fkTipoEmpresa INT,
    FOREIGN KEY (fkTipoEmpresa) REFERENCES tbTipoEmpresa(idTipoEmpresa)
) auto_increment = 100;

select*from tbEmpresa;
INSERT INTO tbEmpresa (razaoSocial, siglaICAO, cnpj) VALUES
('ABAETE', 'ABJ', '14.228.178/0001-54'),
('ATA BRASIL', 'ABZ', '04.432.348/0001-04'),
('AIR MINAS', 'AMG', '05.853.938/0001-22'),
('AZUL', 'AZU', '09.296.295/0001-60'),
('BRASMEX', 'BCA', '10.432.228/0001-57'),
('BETA', 'BET', '02.671.848/0001-62'),
('TAM-TRANSPORTE AEREOS MERIDIONAIS', 'BLC', '92.501.072/0001-60'),
('BRA', 'BRB', '01.141.392/0001-32'),
('ITAPEMIRIM TRANSPORTES REGIONAIS SA', 'ITI', '34.042.788/0001-67'),
('ITAPEMIRIM TRANSPORTES AEREOS S.A.', 'ITM', '31.088.059/0001-83'),
('INTERBRASIL', 'ITB', '00.189.307/0001-99'),
('GOL', 'GLO', '07.575.651/0001-59'),
('MAP LINHAS AEREAS', 'PAM', '10.480.008/0001-50'),
('PENTA', 'PEP', '10.624.466/0001-08'),
('PUMA AIR', 'PLY', '08.846.856/0001-52'),
('PASSAREDO', 'PTB', '01.320.867/0001-79'),
('PANTANAL', 'PTN', '62.276.453/0001-33'),
('RIO LINHAS AEREAS', 'RIO', '08.518.308/0001-39'),
('RICO', 'RLE', '04.911.920/0001-01'),
('SOL', 'SBA', '09.145.431/0001-53'),
('SKYMASTER', 'SKC', '00.673.685/0001-20'),
('SETE', 'SLX', '05.256.938/0001-91'),
('AMÉRICA DO SUL LINHAS AÉREAS', 'SUL', '05.253.938/0001-91'),
('TAM', 'TAM', '02.012.862/0001-60'),
('TRANSBRASIL', 'TBA', '33.222.828/0001-88'),
('TAF', 'TSD', '02.614.549/0001-68'),
('TOTAL', 'TTL', '09.458.685/0001-02'),
('ABSA', 'TUS', '67.004.223/0001-66'),
('TAVAJ', 'TVJ', '09.073.989/0001-68'),
('VARIG LOG', 'VLO', '02.253.387/0001-62'),
('VRG LINHAS AÉREAS', 'VRG', '07.572.651/0001-59'),
('VRG LINHAS AÉREAS', 'VRN', '09.573.739/0001-01'),
('VASP', 'VSP', '61.366.751/0001-70'),
('WEBJET', 'WEB', '09.069.570/0001-87');

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
    fkTipoUsuario INT,
    fkEmpresa INT,
    FOREIGN KEY (fkTipoUsuario) REFERENCES tbTipoUsuario(idTipoUsuario),
    FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpresa)
);

select*from tbUsuario
;


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