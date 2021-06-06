module.exports =  (sequelize, Sequelize) => {
    const Posts = sequelize.define("post", {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      text: {
        type: Sequelize.TEXT,
      },
      image_link: {
        type: Sequelize.TEXT
      },
      
    }, {
      underscored: true
    });
  
    Posts.associate = models => {
      Posts.belongsTo(models.user)
      Posts.hasMany(models.like);
      Posts.hasMany(models.comment);
    };
    
    return Posts;
};