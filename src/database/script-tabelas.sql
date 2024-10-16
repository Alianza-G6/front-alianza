CREATE DATABASE Alianza;

USE Alianza;
    
-- Tabela que define tipos de empresas (ex.: Companhia Aérea, Aeroporto)
CREATE TABLE tbTipoEmpresa (
    idTipoEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45)
);

INSERT INTO tbTipoEmpresa VALUES 
(1,'Companhia Aérea'),
(2,'Aeroporto'),
(3,'Outros');

-- Tabela de empresas, com relação ao tipo de empresa
CREATE TABLE tbEmpresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
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
    idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45)
);

insert into tbTipoUsuario values
(1, 'Administrador'),
(2, 'Gerente'),
(3, 'Analista');

-- Tabela de usuários, com relação ao tipo de usuário e à empresa
CREATE TABLE tbUsuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
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


-- Tabela de aeroportos
CREATE TABLE tbAeroporto (
    idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    siglaICAO VARCHAR(4)
);


INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1, 'SBGL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2, 'KMIA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (5, 'SBGR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (10, 'KJFK');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (14, 'KDFW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (17, 'EBLG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (18, 'GCLP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (20, 'SBKP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (22, 'HKJK');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (23, 'SBSV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (24, 'SNCL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (28, 'SIRI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (30, 'SDLO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (40, 'SDSV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (41, 'CYYZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (44, 'SAEZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (50, 'CYUL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (53, 'CYMX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (54, 'TJSJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (56, 'SBSJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (62, 'SPJC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (66, 'KPHX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (70, 'SBMI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (73, 'SBCJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (74, 'SDOW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (75, 'SBBE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (81, 'SBSP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (82, 'SBJR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (85, 'SBCY');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (86, 'SSOU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (89, 'SBCF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (90, 'SNSS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (93, 'SBAC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (94, 'SBFZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (102, 'SNJM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (106, 'SNLN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (110, 'SBVG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (114, 'SNTO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (117, 'SBEG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (118, 'SWKO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (122, 'SWBR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (126, 'SWMW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (132, 'SBBW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (135, 'SBRF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (136, 'SNAB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (140, 'SNHS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (143, 'SNTS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (148, 'SNGN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (151, 'SBCT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (152, 'SSUM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (155, 'SSUV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (160, 'SNVS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (164, 'SBJD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (168, 'SN6L');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (172, 'SWBE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (176, 'SNIG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (177, 'SNWS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (182, 'SNZR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (186, 'SBMY');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (190, 'SWTP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (193, 'SBTU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (198, 'SNEB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (201, 'SWLB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (206, 'SJZA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (210, 'SSGY');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (214, 'SSVL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (217, 'SNMZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (224, 'SBGO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (227, 'SSRS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (228, 'SBSL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (230, 'SBJE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (232, 'SBPB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (244, 'SBIP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (248, 'SBJA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (250, 'SIXE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (260, 'SBMD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (264, 'SBIH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (266, 'SBHT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (269, 'SNSM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (280, 'SWJN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (286, 'SBMQ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (292, 'SBRJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (294, 'SBSN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (322, 'SDJV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (332, 'SBCG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (336, 'SBDN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (344, 'SBPJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (356, 'SBTB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (382, 'SDVZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (390, 'SSQO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (393, 'LEMD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (404, 'SUMU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (405, 'SBSG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (407, 'LFPG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (419, 'SOCA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (423, 'MMMX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (428, 'SAZS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (429, 'SARP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (434, 'SAAR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (435, 'SKBO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (440, 'SDSC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (441, 'SABE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (457, 'SACO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (468, 'SBBR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (472, 'SAME');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (478, 'SASA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (480, 'SBPS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (488, 'SEQM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (491, 'SCIE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (494, 'SBCX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (510, 'SGAS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (523, 'SBVT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (527, 'SWPI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (531, 'SBTT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (533, 'SBTF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (549, 'SBFN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (558, 'SBFI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (570, 'SBPV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (572, 'SBFL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (580, 'SBTE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (585, 'SBZM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (596, 'SBJP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (601, 'SBLO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (610, 'SBUL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (612, 'SBMG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (614, 'SBJU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (622, 'SBCA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (625, 'SBCR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (626, 'SBDB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (631, 'SBKG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (632, 'SBPL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (640, 'SBCO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (648, 'SBPO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (651, 'SBNF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (656, 'SBJV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (660, 'SSGG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (667, 'SBSR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (670, 'SBAR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (677, 'SBMK');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (680, 'SNCP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (696, 'SBMO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (701, 'SBGV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (708, 'SBIL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (730, 'SBRP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (734, 'SBMS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (750, 'SBIZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (775, 'SBCP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (787, 'SWLC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (814, 'SBSO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (819, 'SBSI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (825, 'SBMA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (829, 'SNPD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (832, 'SBAX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (839, 'SNBR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (850, 'SBVC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (855, 'SBCH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (858, 'SNGI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (861, 'SBAU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (878, 'SBUR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (960, 'SBRD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1000, 'SBAT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1012, 'SBPK');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1018, 'SBSM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1040, 'SBCB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1042, 'SSKW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1060, 'SBPF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1070, 'SBPP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1076, 'SBML');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1080, 'SBBV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1106, 'SNRU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1109, 'LFPO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1112, 'KFLL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1116, 'KMCO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1124, 'LPPT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1138, 'SBAE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1183, 'SBPG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1194, 'SWKQ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1206, 'SWEI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1228, 'SBNM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1232, 'SBUG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1236, 'SBUA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1240, 'SBVH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1254, 'SBLE');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1274, 'SBCN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1284, 'SBJI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1298, 'TNCC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1344, 'SULS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1521, 'SBTG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1572, 'SBTC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1608, 'SBBH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1730, 'EGLL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1738, 'SLVR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1741, 'SLCB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1744, 'ZBAA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1749, 'KCVG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1762, 'MDPC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1765, 'CYHM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1769, 'ELLX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1777, 'EHAM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1788, 'MPTO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1812, 'SWYN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1815, 'TTPP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1822, 'GLRB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1826, 'KATL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1836, 'KHSV');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1839, 'EDDF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1848, 'FNLU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1852, 'MDSD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1855, 'HUEN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1857, 'HAAB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1861, 'DNMM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1864, 'SCEL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1865, 'DGAA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1872, 'GOBD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1881, 'KMEM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (1886, 'TJBQ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2087, 'SBRB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2088, 'SBCZ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2280, 'SMJP');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2403, 'KBFI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2410, 'SJPC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2422, 'KIAH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2423, 'KLAS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2428, 'SKRG');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2429, 'KAEX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2436, 'LFBD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2438, 'LFDB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2445, 'LIRF');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2481, 'RKSI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2482, 'PANC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2488, 'KLAX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2509, 'SGES');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2521, 'KORD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2559, 'LFBO');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2581, 'EBBR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2595, 'SVMI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2605, 'SEGU');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2610, 'SYCJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2656, 'MMSM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2676, 'MROC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2684, 'SBUY');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2688, 'SWCA');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2693, 'SBNT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2764, 'SWGN');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2781, 'OTHH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2836, 'DXXX');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2839, 'FAOR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2843, 'FACT');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2913, 'LSZH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2980, 'LIMC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2983, 'LEBL');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (2993, 'KBOS');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3073, 'LPPR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3090, 'GVAC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3093, 'LTFM');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3105, 'LTAC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3114, 'SYEC');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3117, 'VHHH');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3118, 'VCBI');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3122, 'OMFJ');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3123, 'OMDB');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3131, 'OMDW');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3136, 'KEWR');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3144, 'KIAD');
INSERT INTO tbAeroporto (idAeroporto, siglaICAO) VALUES (3151, 'SVPR');

-- Tabela de companhias aéreas
CREATE TABLE tbCompanhia (
    idCompanhia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    siglaICAO VARCHAR(3)
);

INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (1, 'AAL');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (2, 'ABD');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (3, 'ABJ');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (4, 'ACA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (5, 'ACN');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (6, 'AEA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (7, 'AFR');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (8, 'AMX');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (9, 'ANS');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (10, 'ARE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (11, 'ARG');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (12, 'AVA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (13, 'AZP');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (14, 'AZU');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (15, 'BAW');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (16, 'BOV');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (17, 'CCA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (18, 'CJT');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (19, 'CLX');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (20, 'CMP');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (21, 'CQB');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (22, 'CVK');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (23, 'DAL');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (24, 'DLH');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (25, 'DTA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (26, 'DWI');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (27, 'ETH');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (28, 'FBZ');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (29, 'FDX');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (30, 'GEC');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (31, 'GLO');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (32, 'GTI');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (33, 'GXA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (34, 'HFM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (35, 'IBE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (36, 'IGA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (37, 'ITY');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (38, 'JAT');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (39, 'JES');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (40, 'KAL');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (41, 'KLM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (42, 'LAE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (43, 'LAN');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (44, 'LAP');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (45, 'LCO');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (46, 'LNE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (47, 'LPE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (48, 'LTG');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (49, 'MAA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (50, 'MPH');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (51, 'MWM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (52, 'PAM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (53, 'PTB');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (54, 'QTR');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (55, 'RER');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (56, 'RSB');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (57, 'SAA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (58, 'SID');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (59, 'SKU');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (60, 'SKX');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (61, 'SLM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (62, 'SWR');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (63, 'TAM');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (64, 'TAP');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (65, 'THY');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (66, 'TOT');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (67, 'TPA');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (68, 'TTL');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (69, 'TVR');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (70, 'UAE');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (71, 'UAL');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (72, 'UPS');
INSERT INTO tbCompanhia (idCompanhia, siglaICAO) VALUES (73, 'VCV');

-- Tabela que define o status do voo
CREATE TABLE tbStatusVoo (
    idStatusVoo INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(20) NOT NULL
);

INSERT INTO tbStatusVoo (idStatusVoo, status) VALUES
(1,'Sucesso'),
(2,'Atraso'),
(3,'Cancelado');

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