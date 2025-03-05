const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Section = sequelize.define('section', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})



