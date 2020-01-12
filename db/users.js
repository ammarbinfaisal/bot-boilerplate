const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:.db/db.sqlite', {dialect: "sqlite"});


const users = sequelize.define("users", {
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	first_name: DataTypes.STRING
})

users.sync();

module.exports.getUsers = async () => {
	const users = await users.findAll();
	return [...users];
};

module.exports.addUser = async ({ user_id, username, first_name }) => {
	const user = await users.findAll({where: { user_id }});
	if (user.length == 0) {
		await users.create({ user_id, username, first_name });
	}
};
