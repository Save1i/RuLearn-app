const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Statistics = sequelize.define("statistics", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  daily_streak: { type: DataTypes.INTEGER, defaultValue: 0 },
  daily_streak_max: { type: DataTypes.INTEGER, defaultValue: 0 },
  l_words: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Section = sequelize.define("section", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.STRING, allowNull: false },
});

const Task_progress = sequelize.define("task_progress", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "dont learned" },
  learned: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Test = sequelize.define("test", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  audio_q: { type: DataTypes.STRING, defaultValue: "" },
  img: { type: DataTypes.STRING, allowNull: false },
  text_q: { type: DataTypes.STRING, defaultValue: "" },
  options: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: []},
  correct_answer: { type: DataTypes.STRING, allowNull: false },
  test_type: {type: DataTypes.STRING, defaultValue: "quiz" },
  debug_field: {type: DataTypes.STRING, defaultValue: "work" },
});

const Test_progress = sequelize.define("test_progress", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "dont learned" },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Library = sequelize.define("library", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'dictionaryId'],
    },
  ],
});

const Dictionary = sequelize.define("dictionary", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  source_language: { type: DataTypes.STRING, allowNull: false, defaultValue: "CHS" },
  target_language: { type: DataTypes.STRING, allowNull: false, defaultValue: "RU" },
});

const Word = sequelize.define("word", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, defaultValue: "word" },
  word_source: { type: DataTypes.STRING, allowNull: false, defaultValue: "CHS" },
  word_target: { type: DataTypes.STRING, allowNull: false, defaultValue: "RU" },
});

  const WordProgress = sequelize.define('word_progress', {
    word_progress_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    last_seen: DataTypes.DATE,
    next_review: DataTypes.DATE,
    interval: DataTypes.INTEGER,
    ease_factor: {
      type: DataTypes.FLOAT,
      defaultValue: 2.5,
    },
    repetition: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 'learning',
    },
    isLearned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'wordId'],
      },
    ],
  });


User.hasOne(Statistics);
Statistics.belongsTo(User);

User.hasMany(Task_progress);
Task_progress.belongsTo(User);

User.hasMany(Test_progress);
Test_progress.belongsTo(User);

Task.hasMany(Task_progress, { as: "progress", onDelete: "CASCADE" });
Task_progress.belongsTo(Task);

Test.hasMany(Test_progress, { as: "progress" });
Test_progress.belongsTo(Test);

Section.hasMany(Task);
Task.belongsTo(Section);

Task.hasMany(Test);
Test.belongsTo(Task);

User.hasMany(Library);
Library.belongsTo(User);

Dictionary.hasMany(Library, {as: "library"});
Library.belongsTo(Dictionary, { foreignKey: 'dictionaryId', as: 'dictionary' });


Dictionary.hasMany(Word);
Word.belongsTo(Dictionary);

User.hasMany(WordProgress);
WordProgress.belongsTo(User, { onDelete: 'CASCADE' });

Word.hasMany(WordProgress);
WordProgress.belongsTo(Word, { onDelete: 'CASCADE' });

module.exports = {
  User,
  Statistics,
  Task_progress,
  Test_progress,
  Section,
  Task,
  Test,
  Library,
  Dictionary,
  Word,
  WordProgress,
};