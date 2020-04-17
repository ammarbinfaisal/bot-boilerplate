const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.addUser = async ({ username, first_name, id }) => {
	const u = await client.query(
		q.Map(
			q.Paginate(
				q.Match(q.Index("users_by_id"), id)
			),
			q.Lambda("X", q.Get(q.Var("X")))
		)
	);
	if (u.data.length === 0) {
		return await client.query(
			q.Create(q.Collection("users"), {
				data: {
					id,
					username,
					first_name,
				},
			})
		);
	} else return null;
};

exports.getUsers = async () => {
	return (await client.query(
		q.Map(
			q.Paginate(
				q.Match(q.Index("all_users"))
			),
			q.Lambda("X", q.Get(q.Var("X")))
		)
	)).data.map(x => x.data);
};
