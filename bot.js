const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const db = require('./db');

const {TOKEN, START_MSG, ADMIN_ID} = require("./config.js")

if (!TOKEN) {
	throw new Error('TOKEN NOT PROVIDED');
}

// if (!ADMIN_ID) {
// 	throw new Error('.adminid is empty');
// }

const bot = new TelegramBot(TOKEN);

const isAdmin = id => id == ADMIN_ID;

bot.onText(/^\/start$/, async msg => {
	const {from: {id: user_id, username, first_name}} = msg;
	await bot.sendMessage(user_id, START_MSG);
	await db.addUser({user_id, username, first_name});
});

bot.startPolling();
