const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const db = require("./db");

const TOKEN = fs.readFileSync("./.token", { encoding: "utf-8" });
const ADMIN_ID = fs.readFileSync("./.adminid", { encoding: "utf-8" });
const START_MSG = fs.readFileSync("./start-msg", { encoding: "utf-8" });

if(!TOKEN) throw new Error(".token is empty");
if(!ADMIN_ID) throw new Error(".adminid is empty");

const bot = new TelegramBot(TOKEN);

const isAdmin = id => id == ADMIN_ID;

bot.onText(/^\/start$/, async (msg) => {
    const {from: {id: user_id, username, first_name}, } = msg;
    await bot.sendMessage(user_id, START_MSG);
    await db.addUser({user_id, username, first_name});
});


// FOR ANNOUNCEMENTs

let gonnaAnnounce = false;

bot.onText(/\/?announce$/i, ({ chat: { id } }) => {
    if (isAdmin(id)) gonnaAnnounce = true;
});

bot.on("message", async (msg) => {
    const {chat: {id}, text} = msg;
    if(isAdmin(id) && gonnaAnnounce){
        const users = await db.getUsers();
        await Promise.all(
            users.map(user => bot.sendMessage(user.user_id, text))
        );
        gonnaAnnounce = false;
    }
});

bot.startPolling();
