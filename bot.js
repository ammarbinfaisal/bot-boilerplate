const TelegramBot = require("node-telegram-bot-api");
const {start_message, help_message} = require("./bot.config");
const db = require("./db");

const bot = new TelegramBot(process.env.BOT_TOKEN);

exports.handleMessage = async (message) => {
    const {text, chat: {id, username, first_name}} = message;
    if(text === "/start") {
        await Promise.all([
            bot.sendMessage(id, start_message, {parse_mode: "MarkdownV2"}),
            db.addUser({id, username, first_name})
        ]);
    } else if(text === "/help") {
        await bot.sendMessage(id, help_message, {parse_mode: "MarkdownV2"});
    } else if(/announce/.test(text) && id == process.env.ADMIN_ID) {
        const users = await db.getUsers();
        const msg = text.replace("announce", "").trim();
        users.forEach(u => bot.sendMessage(u.id, msg, {parse_mode: "MarkdownV2"}));
    }
}

exports.handleInlineQuery = async (inline_query) => {

}

exports.handleCallbackQuery = async (cb_query) => {

}
