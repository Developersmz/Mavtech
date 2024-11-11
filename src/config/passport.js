const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/Models')
const bcrypt = require('bcryptjs')

// PASSPORT CONFIG
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return done(null, false, { message: "Usuário não encontrado." })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return done(null, false, { message: "Senha incorreta." })
            }

            return done(null, user)
        } catch (e) {
            return done(e)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
try {
    const user = await User.findByPk(id);
    done(null, user);
} catch (e) {
    done(e);
}
});

// Middleware para verificar se o user esta logado
function checkLogin(req, res, access) {
    if (req.session.userId) {
        access()
    } else {
        res.redirect('/auth/signin')
    }
}

// Checar se tem permissoes de administrador
function checkAdmin(req, res, access){
    if (req.session.passport && req.session.passport.user){
        User.findByPk(req.session.passport.user)
        .then(user => {
            if (user && user.isAdmin) {
                access()
            } else {
                res.status(403).send('<h1>Acesso negado</h1><br><a href="/">Voltar</a>');
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Erro interno do servidor')
        })
    }
    else{
        res.redirect('/mavtech/signin')
    }
}

module.exports = {
    passport, 
    checkLogin, 
    checkAdmin
}
