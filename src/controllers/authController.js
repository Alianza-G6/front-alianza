const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório!' });
  }

  
  const resetCode = Math.floor(100000 + Math.random() * 900000); 


  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Código de Redefinição de Senha - Alianza',
    text: `Olá, você recebeu este e-mail porque solicitou a redefinição da sua senha em Alianza. Use o código abaixo para redefinir sua senha: ${resetCode}`,
    html: `<p>Olá,</p>
           <p>Você recebeu este e-mail porque solicitou a redefinição da sua senha em <strong>Alianza</strong>.</p>
           <p>Use o código abaixo para redefinir sua senha:</p>
           <h2 style="font-size: 2em; color: #007bff; font-weight: bold;">${resetCode}</h2>
           <p>Se você não solicitou essa redefinição de senha, por favor, ignore este e-mail.</p>
           <p>Atenciosamente, <br>Equipe Alianza</p>`,

           
    
  };

  try {
    await sgMail.send(msg);

    return res.status(200).json({ message: 'E-mail enviado com sucesso!', resetCode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
};

