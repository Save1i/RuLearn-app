'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'word_progresses',
      'isLearned',
      {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      }
    )
},
  async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('word_progresses', 'isLearned');
},
};
