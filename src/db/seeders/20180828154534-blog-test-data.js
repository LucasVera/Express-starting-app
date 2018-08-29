'use strict';
var moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BlogPosts', [
      {
        title: 'My First Blog Post',
        subtitle: 'This is my very first blog post.',
        posted: true,
        postedDate: moment('01/01/2018', 'DD/MM/YY').format(),
        text: 'This is my first blog post. It is in my starter express app. This is only test data, not much to see here',
        views: 3,
        likes: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogPosts', null, {});
  }
};
