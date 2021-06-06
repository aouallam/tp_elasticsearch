module.exports =  (sequelize, Sequelize) => {
    const Likes = sequelize.define("like", {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      
    }, {
      underscored: true
    });
  
    Likes.associate = models => {
      Likes.belongsTo(models.post);
      Likes.belongsTo(models.user);
    };
    
    return Likes;
  };