var emailModels = require("../models/emailModels");

function enviarEmail(req, res) {
  
    let de = req.body.deServer;
    let para = req.body.paraServer;
    let assunto = req.body.assuntoServer;
    let mensagem = req.body.mensagemServer;
  
    if (de == undefined) {
      res.status(400).send("O destinatário está undefined!");
    } else if (assunto == undefined) {
      res.status(400).send("O assunto está undefined!");
    } else if (mensagem == undefined) {
      res.status(400).send("A mensagem está undefined!");
    } else {
      emailModels
        .enviarEmail(de, para, assunto, mensagem)
        .then((resultado) => {
          res.json({ mensagem: "E-mail enviado com sucesso!", resultado });
        })
        .catch((erro) => {
          console.log("\nHouve um erro ao enviar o e-mail:", erro);
          res.status(500).json({ erro: erro.message });
        });
    }
  }

  module.exports = {
    enviarEmail
};