import sequelize from 'sequelize'

const connection = new sequelize('formulario','root', '012603' ,{
    host:'localhost',
    dialect:'mysql'
});

export default connection;
