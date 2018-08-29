import bcrypt from 'bcrypt';

const maskPassword = entity => {
  entity.password = undefined;
}

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };

  Users.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  Users.afterFind((result, options) => {
    console.log(options);
    if (Array.isArray(result)) {
      for (let i = 0; i < result.length; i++) {
        maskPassword(result[i]);
      }
    }
    else {
      maskPassword(result);
    }
  });

  Users.afterCreate(result => {
    maskPassword(result);
  });

  return Users;
};