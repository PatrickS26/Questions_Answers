import sequelize from 'sequelize'
import connection from './database.js';

const question = connection.define('question',{
    tittle:{
        type: sequelize.STRING,
        allowNull: false

    
    }, 
    description:{
        type: sequelize.TEXT,
        allowNull: false
    }
    
});


question.sync({force:false}).then(() => {});

export default question;