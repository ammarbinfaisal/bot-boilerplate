const pino = require('pino');
const logger = pino({
  prettyPrint: { colorize: true }
});
const fastify = require("fastify")({ logger });

const bot = require("./bot");

fastify.post(`/bot${process.env.BOT_TOKEN}`, async (request, reply) => {
    const { body } = request;
    console.log(JSON.stringify(body, null, 2));
	if (body.message) {
		bot.handleMessage(body.message).catch(console.log);
	} else if(body.inline_query) {
        bot.handleInlineQuery(body.inline_query).catch(console.log);
    } else if(body.callback_query) {
        bot.handleCallbackQuery(body.inline_query).catch(console.log);
    }
    reply.code(200);
    return "got it...";
});

fastify.listen(3000, (err, address) => {
	if (err) throw err;
	fastify.log.info(`server listening on ${address}`);
});
