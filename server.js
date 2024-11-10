require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const MySQLStore = require('express-mysql-session')(session)
const path = require('path')
const app = express()

const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const PORT = 3000

// SESSIONS
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

// Helpers
const hdbs = handlebars.create({
    helpers: {
        truncate: function (text, length) {
            if (typeof text === 'string' && text.length > length) {
                return text.substring(0, length) + '...';
            }
            return text || '';
        },
        isStar: function (rating, index) {
            return index < rating;
        },
        range: function (start, end) {
            const result = [];
            for (let i = start; i <= end; i++) {
                result.push(i);
            }
            return result;
        }
    }
});

// CONFIG HANDLEBARS
const hbs = handlebars.create({ defaultLayout: 'main' }, {allowProtoMethodsByDefault: true})
app.engine('handlebars', hbs.engine)
app.engine('handlebars', hdbs.engine)
app.set('view engine', 'handlebars')

// CONFIG DIR TO VIEWS
app.set('views', path.join(__dirname, './src/views'))

app.use(session({
    key: 'sessionformavtechnologydefault',
    secret: 'thisismysecretsessionkeyformavtechnology',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname));
        }
    })
});


module.exports = upload

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const routes = require('./src/routes/index')
const adminroutes = require('./src/routes/admin')
const auth = require('./src/routes/auth')

app.use('/', routes)
app.use('/auth/', auth)
app.use('/admin', adminroutes)


app.listen(PORT || 3000, () => {
    console.log(`SERVER ARE RUNNING IN PORT ${PORT}`)
})
