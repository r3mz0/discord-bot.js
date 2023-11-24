const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const config = require('./config.json');
const prefix = '/';  // Bot Prefix
const commands = require('./bot-config/commands');  // Stored all your bot commands in single file

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Global registration "slash commands"
  try {
    const globalCommands = await client.application.commands.set(commands);
    console.log(`Registered global commands: ${globalCommands.map(cmd => cmd.name).join(', ')}`);
  } catch (error) {
    console.error(`Error registering global commands: ${error.message}`);
  }

  // So we can use "/" for creating "slash commands" in text
  await client.guilds.cache.forEach(async (guild) => {
    try {
      await guild.commands.set([]);
      console.log(`Cleared commands for guild ${guild.name} (${guild.id})`);
    } catch (error) {
      console.error(`Error clearing commands for guild ${guild.name} (${guild.id}): ${error.message}`);
    }
  });
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;  // Ignoring messages from other Bots

  if (message.mentions.has(client.user)) {
    const textBeforeEmbed = 'Custom text when someone Mention me.\nThis message is in another line.';  // Your cestom message when somebody @Mention your bot - Before Embed.

    const embedResponse = {
      content: textBeforeEmbed,
      embeds: [
        {
          title: '**__Helpful Commands:__**',
          type: 'rich', // types: 'rich', 'image', 'video', 'gifv', 'article', 'link'
          color: 0xFF0056,  // Your embed color
          description: '**/ping** - Ping, Pong command.\n:**/hello** - Custom message command.',  // Change your own Description inside Embed.
        },
      ],
    };

    /*  Example of different Embed types:
    {
        title: 'Image Embed',
        type: 'image',
        url: 'https://example.com/image.png',
    },
    {
        title: 'Video Embed',
        type: 'video',
        url: 'https://example.com/video.mp4',
    }, */

    message.reply({ content: textBeforeEmbed, embeds: [embedResponse.embeds[0]], components: embedResponse.components });
  } else if (message.content.startsWith(prefix)) {
    // ... Place Code here for processing commands with prefix
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Processing "slash commands"
  const command = commands.find(cmd => cmd.name === commandName);

  if (command) {
    command.executeInteraction(interaction);
  }
});

client.login(config.token);  // Your bot Token stored in config.json
