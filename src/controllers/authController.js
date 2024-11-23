const sgMail = require('@sendgrid/mail');
const authModels = require('../models/authModels'); 
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("O e-mail é obrigatório!");
    }

    authModels.buscarUsuarioPorEmail(email)
        .then(function (usuario) {
            if (usuario.length === 0) {
                return res.status(404).send("Usuário não encontrado!");
            }

            const resetCode = Math.floor(100000 + Math.random() * 900000);

            authModels.inserirCodigo(usuario[0].idUsuario, resetCode)
                .then(function () {
                   
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

                    sgMail.send(msg)
                        .then(function () {
                            res.status(200).json({ message: 'E-mail enviado com sucesso! Verifique sua caixa de entrada para o código.' });
                        })
                        .catch(function (erro) {
                            console.error("Erro ao enviar o e-mail: ", erro);
                            res.status(500).json({ error: 'Erro ao enviar e-mail.' });
                        });
                })
                .catch(function (erro) {
                    console.log("\nHouve um erro ao inserir o código: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao buscar o usuário: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    forgotPassword,
};

