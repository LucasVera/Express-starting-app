'use strict';
var moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    subtitle: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    posted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    postedDate: {
      type: DataTypes.STRING,
      defaultValue: moment().format()
    },
    text: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  BlogPosts.associate = function(models) {
    // associations can be defined here
  };
  return BlogPosts;
};