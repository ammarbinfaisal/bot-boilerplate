- Declare environement variables BOT_TOKEN, FAUNADB_SECRET, and ADMIN_ID in the .env file.
- Provide start_message and help_message in bot.config file.
- Run `CreateCOllection("users")` and then users.fql present in db directory in fauna shell.
- You are ready to make your awesome bot now.

NOTE: your telegram id is required in case you want to send announcement to bot users.
For example sending "announce hello users" to your bot will make it send "hello users" to all users present in the database.
