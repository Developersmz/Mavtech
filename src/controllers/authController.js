const { Op } = require('sequelize')
const { passport } = require('../config/passport')
const { User } = require('../models/Models')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const createUser = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.render('signup', { error: 'E-mail já registrado. Use outro ou faça login.' });
            }
            if (existingUser.username === username) {
                return res.render('signup', { error: 'Nome de usuário em uso. Tente outro.' });
            }
        }
        if (password !== confirmPassword) {
            return res.render('signup', { error: 'Palavras-passe não coincidem, verifique e tente novamente.' })
        }
        // Criar o novo usuário
        const newUser = await User.create({
            username,
            email,
            password
        });

        // Realizar login automaticamente após criar o usuário
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }

            // Se o login for bem-sucedido, redireciona para a página inicial
            return res.redirect('/mavtech?logged_in=true');
        });
    } catch (error) {
        console.error(error);
        res.render('signup', { error: 'Erro ao registrar o usuário, tente novamente.' })
    }
}

const logUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.render('signin', {error: info.message })
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            }
            return res.redirect('/mavtech?logged_in=true')
        })
    })(req, res, next)
}

const contactEmail = async (req, res) => {
    const { name, email, number, message } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Configurando o e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Novo contato de ${name}`,
        text: `Mensagem: ${message} \n\n Email: ${email} \n\n Contacto: ${number}`
    }

    try {
        await transporter.sendMail(mailOptions)
        res.status(200).json({ message: 'E-mail enviado com sucesso!' })
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail' });
    }
}

const logOut = async (req, res) => {
    req.logout(() => {
        res.render('signout')
    })
}

const recoveryPass = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.render('passrecovery', {error: "O email que digitou não existe, verique!"})
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpires = Date.now() + 3600000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetTokenExpires
        await user.save()

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const resetUrl = `https://mavtech.onrender.com/auth/resetPass/${resetToken}`
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'MAVTECHNOLOGY | REDEFINIÇÃO DE SENHA',
            text: `Você está recebendo este e-mail porque solicitou a redefinição de senha para sua conta.\n\n
                Por favor, clique no link a seguir para redefinir sua senha:\n\n
                ${resetUrl}\n\n
                Se você não solicitou isso, ignore este e-mail e sua senha permanecerá inalterada.\n\n
                MAVTECHNOLOGY.
                `,
        }

        await transporter.sendMail(mailOptions)

        return res.render('passrecovery', { success: "Um e-mail de redefinição de senha foi enviado para o endereço fornecido."})

    } catch (error) {
        res.status(500).send('<h2>Ocorreu um erro ao enviar o e-mail de redefinição de senha.</h2>')
        console.log(error)
    }
}

const resetPass = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { [Op.gt]: Date.now() },
            },
        })

        if (!user) {
            return res.status(400).send('<h1>Token de redefinição inválido ou expirado.</h1>');
        }

        res.render('resetpassword', { token: req.params.token })
    }  catch (error) {
        res.status(500).send('<h1>Ocorreu um erro ao processar o token.</h1>');
        console.log(error)
    }
}

const changePass = async (req, res) => {
    const { newpass, confpass } = req.body

    try {
        const user = await User.findOne({
          where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { [Op.gt]: Date.now() },
          },
    });

    if (!user) {
        return res.render('resetpassword', { error: 'Token de redefinição inválido ou expirado.'});
    }

    if (newpass != confpass) {
        return res.render('resetpassword', { error: 'As senhas que digitou são diferentes.'});
    }

    user.password = await bcrypt.hash(newpass, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.render('resetpassword', { success: "A sua senha foi alterada com sucesso!" })
    
    } catch (error) {
        res.status(500).send('<h1>Erro ao redefinir a senha, tente novamente!</h1>')
    }
}

module.exports = {
    createUser, logUser, contactEmail, logOut, recoveryPass, resetPass, changePass
}