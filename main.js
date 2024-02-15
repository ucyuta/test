const Discord = require("discord.js");
const client = new Discord.Client({
    intents: Object.values(Discord.GatewayIntentBits)
});
require("dotenv").config();

const data = [
    new Discord.SlashCommandBuilder()
    .setName("hi")
    .setDescription("あいさつします。")
]

client.once("ready", async () => {
    await client.application.commands.set(data);
    console.log(`${client.user.username} is ready...`)
})

client.on("messageCreate", async message => {
    if(message.author.bot) return;

    if(message.content === "hi")
    {
        await message.reply(`Hello, ${message.author.username}`);
    }
})

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === "hi")
    {
        const ping = client.ws.ping;
        await interaction.reply(`Hi!, ping ${ping}ms`);
    }
})

client.login(process.env.TOKEN);