const express = require('express')
const router = express.Router()
const { User, Home, About, Program, Service, Blog, Testimony, Highlight } = require('../models/Models')

// Redirect to mavtech
router.get('/', (req, res) => {
    res.redirect('/mavtech')
})

// Mavtech
router.get('/mavtech', async (req, res) => {
    try {
        // Busca todos os dados em paralelo
        const home = await Home.findAll()
        const about = await About.findAll()
        const programs = await Program.findAll()
        const services = await Service.findAll()
        const testimonies = await Testimony.findAll()
        const blogs = await Blog.findAll()
        const highlights = await Highlight.findAll()

        const userId = req.session.userId;
        let user = null;

        if (userId) {
            const foundUser = await User.findByPk(userId);
            user = foundUser ? foundUser.toJSON() : null;
        }

        // Converte os dados para JSON
        const aboutData = about.map(item => item.toJSON());
        const homeData = home.map(item => item.toJSON());
        const programsData = programs.map(item => item.toJSON());
        const servicesData = services.map(item => item.toJSON());
        const testimoniesData = testimonies.map(item => item.toJSON());
        const blogsData = blogs.map(item => item.toJSON());
        const highlightsData = highlights.map(item => item.toJSON())


        res.render('index', { 
            user: user, 
            home: homeData,
            about: aboutData,
            programs: programsData, 
            services: servicesData, 
            testimonies: testimoniesData,
            blogs: blogsData,
            highlights: highlightsData,
            title: "Mavtechnology | Mavtech"
        });
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        res.status(500).send("Ocorreu um erro.");
    }
});

// Terms and conditions
router.get('/mavtech/terms_conditions', (req, res) => {
    res.render('policy_privacy', { title: "Mavtechnology | Privacy policy" })
})

// Privacy and policy
router.get('/mavtech/privacy_policy', (req, res) => {
    res.render('terms_conditions', { title: "Mavtechnology | Terms & Conditions" })
})



module.exports = router