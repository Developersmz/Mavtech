const express = require('express')
const router = express.Router()
const { createUser, logUser, contactEmail, logOut, recoveryPass, resetPass, changePass } = require('../controllers/authController')

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signUp', createUser)

router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/signIn', logUser)

router.post('/contactEmail', contactEmail)

router.get('/signout', logOut)

router.get('/forgotPass', (req, res) => {
    res.render('passrecovery')
})

router.post('/forgotPass', recoveryPass)

router.get('/resetPass/:token', resetPass)

router.post('/changePass/:token', changePass)

module.exports = router