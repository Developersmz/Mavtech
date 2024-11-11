const conn = require('../config/conection_config')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const User = conn.sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
})

User.beforeCreate(async (user) => {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
})

const Home = conn.sequelize.define('Home', {
    companyname: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    companytext: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visionImg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ourvision: {
        type: DataTypes.STRING,
        allowNull: true
    },
    visiontext: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    missionImg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ourmission: {
        type: DataTypes.STRING,
        allowNull: true
    },
    missiontext: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    valuesImg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ourvalues: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valuestext: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

const About = conn.sequelize.define('About', {
    intro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
})

const Program = conn.sequelize.define('Program', {
    label: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
})

const Service = conn.sequelize.define('Service', {
    label: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    objective: {
        type: DataTypes.STRING,
        allowNull: true
    },
    program: {
        type: DataTypes.STRING,
        allowNull: true
    },
    programLink: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const Testimony = conn.sequelize.define('Testimony', {
    label: {
        type: DataTypes.STRING,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const Blog = conn.sequelize.define('Blog', {
    label: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    news: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

const Highlight = conn.sequelize.define('Highlight', {
    highlight: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

// conn.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log('Banco de dados sincronizado e modelo atualizado.');
//     })
//     .catch((err) => {
//         console.log('Erro ao sincronizar o banco de dados:', err);
// });

module.exports = {
    User: User,
    Home: Home,
    About: About,
    Program: Program,
    Service: Service,
    Testimony: Testimony,
    Blog: Blog,
    Highlight: Highlight
}
