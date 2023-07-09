const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL)

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM('Admin', 'User'),
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});


Users.sync({ force: false }).then(() => {
    console.log('Users table created');
});

module.exports = Users;
