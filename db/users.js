const knex = require('./knex');

(async () => {
	const hasUsersTable = await knex.schema.hasTable('users');
	if (hasUsersTable) {
		return;
	}

	await knex.schema.createTable('users', table => {
		table.integer('user_id').notNullable().unique();
		table.string('username').unique();
		table.string('first_name').notNullable();
	});
})();

module.exports.getUsers = async () => {
	const users = await knex('users');
	return [...users];
};

module.exports.addUser = async ({user_id, username, first_name}) => {
	const user = await knex('users').where({user_id}).first();
	if (!user) {
		await knex('users').insert({user_id, username, first_name});
	}
};
