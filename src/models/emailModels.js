const nodemailer = require("nodemailer");
const sendgridApiKey = process.env.SENDGRID_API_KEY;


function enviarEmail(de, para, assunto, mensagem) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alianza.sptech@gmail.com",
        pass: "selq vmwq ovol suqi"
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: de,
      to: para,
      subject: assunto,
      text: mensagem,
    };

    console.log(`para a ser enviado: ${para}`)
    console.log(`de a ser enviado: ${de}`)
    console.log(`assunto a ser enviado: ${assunto}`)
    console.log(`mensagem a ser enviado: ${mensagem}`)
   
    transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = {
    enviarEmail
};