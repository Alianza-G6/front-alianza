var database = require("../database/config");

function buscarUsuarioPorEmail(email) {
  const query = `SELECT * FROM tbUsuario WHERE email = '${email}';`;
  return database.executar(query);
}

function inserirCodigo(fkUsuario, resetCode) {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);  
  
    const expirationString = expirationTime.toISOString().slice(0, 19).replace('T', ' '); 
  
    const query = `INSERT INTO tbCodigoUsuario (fkUsuario, codigo, dataExpiracao)
                   VALUES (${fkUsuario}, '${resetCode}', '${expirationString}');`;
  
    return database.executar(query);
  }
  

module.exports = { buscarUsuarioPorEmail, inserirCodigo };
