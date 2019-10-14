const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './db/db.sqlite'
	},
	useNullAsDefault: true
});

module.exports = knex;
