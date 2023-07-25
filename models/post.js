'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.belongsTo(models.User, {foreignKey: 'userId'})
            // define association here
        }
    }

    Post.init({
        description: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            // gallery: {
            //     type: DataTypes.STRING
            // },
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Post',
        timestamps: true,
        associate: (models) => {
            Post.belongsTo(models.User, {foreignKey: 'userId'})
        }
    });
    return Post;
};