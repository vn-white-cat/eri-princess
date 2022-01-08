const { Client, Intents } = require('discord.js')
const DotEnv = require("dotenv")
const FileSystem = require("fs")
const commandEval = require("./msg-command/command-eval");
const messageWatcher = require("./msg-watcher/message-watcher")

if (FileSystem.existsSync(`${__dirname}/../.env`)) DotEnv.config()

const token = process.env.BOT_TOKEN
const ERI_COMMAND = process.env.ENVIRONMENT == "DEV" ? "_eri" : "eri"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', () => {
    console.log('Ready!')
})

client.on("messageCreate", (message) => {
    if (message.content.startsWith(ERI_COMMAND)) {
        commandEval(message.content.split(" "), message)
    } else {
        messageWatcher(message)
    }
})

client.login(token)