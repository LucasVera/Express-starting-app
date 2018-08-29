'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      subtitle: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      posted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      postedDate: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      text: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogPosts');
  }
};