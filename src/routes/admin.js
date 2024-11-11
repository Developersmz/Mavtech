const express = require('express')
const router = express.Router()
const { User, Home, About, Program, Service, Blog, Testimony, Highlight } = require('../models/Models')
const { checkLogin, checkAdmin } = require('../config/passport')
const upload = require('../../server')

router.get('/dashboard', checkLogin, checkAdmin, async (req, res) => {
    const numberUsers = await User.count()
    let admin = null
    const grabadmin = await User.findOne({ 
        where: {
            isAdmin: true
        }
     })
    if (grabadmin) {
        admin = grabadmin ? grabadmin.toJSON() : null
    }

    const numberPrograms = await Program.count({ where: { label: null } })
    const numberServices = await Service.count({ where: { label: null } })
    const numberTestimonies = await Testimony.count({ where: { label: null } })
    const numberBlog = await Blog.count({ where: { label: null } })
    const timeelapsed = Date.now()
    const date = new Date(timeelapsed)
    date.toDateString()

    res.render('dashboard', { 
        numberUsers: numberUsers,
        numberPrograms: numberPrograms,
        numberServices: numberServices,
        numberTestimonies: numberTestimonies,
        numberBlog: numberBlog,
        admin,
        date
    })
})

router.get('/dashboard/add', checkLogin, checkAdmin, async (req, res) => {
    res.render('add')
})

router.post('/dashboard/add/values', upload.single('image'), async (req, res) => {
    switch (req.body.hidden) {
        case "compVision": {
            const { visionname, visiontext } = req.body

            const imagePath = req.file ? req.file.location : null

            const data = {
                ourvision: visionname,
                visiontext: visiontext,
                visionImg: imagePath
            }
            Home.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Home.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "compMission": {
            const { missionname, missiontext } = req.body

            const imagePath = req.file ? req.file.location : null;

            const data = {
                ourmission: missionname,
                missiontext: missiontext,
                missionImg: imagePath
            }
            Home.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Home.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "compValues": {
            const { valuename, valuetext } = req.body

            const imagePath = req.file ? req.file.location : null;

            const data = {
                ourvalues: valuename,
                valuestext: valuetext,
                valuesImg: imagePath
            }
            Home.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Home.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
    }
})
router.post('/dashboard/add', async (req, res) => {
    switch (req.body.hidden) {
        case "homeContent": {
            const { homename, hometext } = req.body
            const data = {
                companyname: homename,
                companytext: hometext
            }
            Home.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Home.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "aboutContent": {
            const { aboutintro, abouttext } = req.body
            const data = {
                intro: aboutintro,
                text: abouttext
            }
            About.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return About.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "programLabel": {
            const { programlbl } = req.body
            const data = {
                label: programlbl
            }
            Program.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Program.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "programItem": {
            const { programicon, programcategory, programname, programdesc, link } = req.body
            const data = {
                icon: programicon,
                category: programcategory,
                name: programname,
                description: programdesc,
                link: link
            }
            Program.create(data).then(() => res.render('status', { success: "Tabela atualizada com sucesso!"}))
            .catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "serviceLabel": {
            const { servicelbl } = req.body
            const data = {
                label: servicelbl
            }
            Service.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Service.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "serviceItm": {
            const { serviceicon, servicetitle, serviceobjective, serviceprogram } = req.body
            const data = {
                icon: serviceicon,
                name: servicetitle,
                objective: serviceobjective, 
                program: serviceprogram
            }
            Service.create(data).then(() => res.render('status', { success: "Tabela atualizada com sucesso!"}))
            .catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "testiLabel": {
            const { testimonylbl } = req.body
            const data = {
                label: testimonylbl
            }
            Testimony.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Testimony.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "blogLabel": {
            const { bloglbl } = req.body
            const data = {
                label: bloglbl
            }
            Blog.update(data, { where: {} })
            .then(([affectedRows]) => {
                if (affectedRows === 0) {
                    return Blog.create(data)
                }
                res.render('status', { success: "Tabela atualizada com sucesso!"})
            }).catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
        case "highlight": {
            const { highlight, link } = req.body
            const data = {
                highlight: highlight,
                link: link
            }
            Highlight.create(data).then(() => res.render('status', { success: "Tabela atualizada com sucesso!"}))
            .catch((e) => res.render('status', { error: `Erro: ${e}` }))
            break
        }
    
    }
})
// Add a blog
router.post('/dashboard/add/blog', upload.single('image'), async (req, res) => {
    try {
        const { title, news } = req.body

        const imagePath = req.file ? req.file.location : null;

        const newBlog = await Blog.create({
            title,
            news,
            image: imagePath
        })
        res.redirect('/')
    } catch (error) {
        console.log("Erro ao criar o blog: " + error)
        res.status(500).send("Erro ao criar o blog.");
    }
})

router.post('/dashboard/add/testi', async (req, res) => {
    const { author, message, rating } = req.body

    const testimony = {
        author: author,
        message: message,
        rating: rating
    }
    await Testimony.findOne({
        where: {
            author: author
        }
    }).then(existingTesti => {
        if (existingTesti) {
            res.status(500).send('O usuário já deu um testemunho!')
        } else {
            return Testimony.create(testimony)
        }
    })
    res.redirect('/')
})


module.exports = router