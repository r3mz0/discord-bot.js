  // ↓ ↓ Command /ping ↓ ↓
module.exports = [
  {
  name: 'ping',
  description: 'Ping-Pong command.',
  executeMessage: (message) => {
    const latency = Date.now() - message.createdTimestamp;
    message.reply(`Pong! :ping_pong:`);
  },
  executeInteraction: (interaction) => {
    const latency = Date.now() - interaction.createdTimestamp;
    interaction.reply(`Pong! :ping_pong:`);
  },
},
    // ↑ ↑ Command /ping ↑ ↑
  
    // ↓ ↓ Command /hello ↓ ↓
  {
    name: 'hello',
    description: 'Basic Message command.',
    executeMessage: (message) => {
      message.reply('Hi! 👋');
    },
    executeInteraction: (interaction) => {
      interaction.reply('Hi! 👋');
    },
  },
  // ↑ ↑ Command /hello ↑ ↑
  
  // ↓ ↓ Command /invite ↓ ↓
  {
  name: 'invite',
  description: 'Invite the bot to your server.',
  executeMessage: async (message) => {
    const inviteMessage = 'Click to invite the bot to your server:';
    const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot';

    const inviteButton = {
      type: 1,
      components: [
        {
          type: 2,
          label: 'Invite To Your Server',
          style: 5,
          url: inviteLink,
        },
      ],
    };
    try {
      await message.reply({ content: inviteMessage, components: [inviteButton] });
    } catch (error) {
      console.error(`Error sending invite message: ${error.message}`);
    }
  },
  executeInteraction: async (interaction) => {
    const inviteMessage = 'Click to invite the bot to your server:';
    const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot';  // Change YOUR_CLIENT_ID with your bot ID

    const inviteButton = {
      type: 1,
      components: [
        {
          type: 2,
          label: 'Invite To Your Server',
          style: 5,
          url: inviteLink,
        },
      ],
    };

    try {
      await interaction.reply({ content: inviteMessage, components: [inviteButton] });
    } catch (error) {
      console.error(`Error sending invite message: ${error.message}`);
    }
  },
}
  // ↑ ↑ Command /invite ↑ ↑
  
  // ↓ ↓ Command /??? ↓ ↓
    
  // ↑ ↑ Command /??? ↑ ↑
  // Add more commands and their functions as needed
];
