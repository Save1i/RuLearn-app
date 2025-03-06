const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Statistics = sequelize.define('statistics', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    daily_streak: {type: DataTypes.NUMBER, defaultValue: 0},
    daily_streak_max: {type: DataTypes.NUMBER, allowNull: false},
    l_words: {type: DataTypes.NUMBER, allowNull: false},
})

const Section = sequelize.define('section', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Task = sequelize.define('task', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    duration: {type: DataTypes.STRING, allowNull: false},
    completed: {type: DataTypes.BOOLEAN, defaultValue: false},
    score: {type: DataTypes.NUMBER, defaultValue: 0},
})

const Test = sequelize.define('test', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    audio_q: {type: DataTypes.BYTEA, allowNull: true},
    text_q: {type: DataTypes.STRING, defaultValue: ""},
    options: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    correct_answer: {type: DataTypes.STRING, allowNull: false},
    completed: {type: DataTypes.BOOLEAN, defaultValue: false},
})


const Library = sequelize.define('library', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Dictionary = sequelize.define('dictionary', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    source_language: {type: DataTypes.STRING, allowNull: false, defaultValue: "CHS"},
    target_language: {type: DataTypes.STRING, allowNull: false, defaultValue: "RU"},
    selected: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const Word = sequelize.define('word', {
    id: {types: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    word_source: {type: DataTypes.STRING, allowNull: false, defaultValue: "CHS"},
    word_target: {type: DataTypes.STRING, allowNull: false, defaultValue: "RU"},
    status: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: "Новое слово"},
    repeat_show: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
})


User.hasOne(Statistics)
Statistics.belongsTo(User)

User.hasMany(Section)
Section.belongsTo(User)

Section.hasMany(Task)
Task.belongsTo(Section)

Task.hasMany(Test)
Test.belongsTo(Task)

User.hasOne(Library)
Library.belongsTo(User)

Library.hasMany(Dictionary)
Dictionary.belongsTo(Library)

Dictionary.hasMany(Word)
Word.belongsTo(Dictionary)







