module.exports.defineUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        senha: {
            type: DataTypes.STRING,
        },
        tipo: {
            type: DataTypes.ENUM('Aluno', 'Professor', 'Administrador'),
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiracao_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
        {
            timestamps: false,
            tableName: 'usuarios'
        });


    return User;
}