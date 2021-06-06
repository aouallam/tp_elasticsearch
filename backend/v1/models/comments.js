module.exports =  (sequelize, Sequelize) => {
    const Comments = sequelize.define("comment", {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      content: {
        type: Sequelize.STRING,
      }
      
    }, {
      underscored: true
    });
  
    Comments.associate = models => {
      Comments.belongsTo(models.post);
      Comments.belongsTo(models.user);
    };
    
    return Comments;
  };