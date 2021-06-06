module.exports =  (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uuid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,

    },
    password: {
      type: Sequelize.STRING
    },
    first_name : {
      type: Sequelize.STRING,

    },
    last_name: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    image_link: {
      type: Sequelize.STRING
    },
    
  }, {
    underscored: true
  });

  User.associate = models => {
    User.hasMany(models.post);
    User.hasMany(models.like);
    User.hasMany(models.comment);
  };
  
  return User;
};