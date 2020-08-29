const QuickYtSearch = require('quick-yt-search'); // Require the package
const Discord = require('discord.js'); // Require Discord.Js
const ytdl = require('ytdl-core'); // Require ytdl-core
const client = new Discord.Client({ disableMentions: 'everyone' }); // Create new Discord client
const YoutubeSearcher = new QuickYtSearch({ // Init the YouTubeSearch system
    YtApiKey: 'some YouTube API key', // Place your YouTube API key here
});
const config = {
    token: 'some Discord bot token', // Place your Discord bot token here
    'prefix': '!' // Place your bot prefix here
};

client.on('message', async message => { // When client receive message
    if (message.content.startsWith(config.prefix + 'play')) { // If message starts with '!(prefix)play'
        if (message.member.voice.channel) { // Check if message author is in a voice channel
            let args = message.content.split(' ').slice(1).join(' '); // Define the args
            if (!args) { // If no args in the message
                message.reply('No args inserted.'); // Replay with mention the message author
            };
            const connection = message.member.voice.channel.join(); // Join the message author voice channel
            if (YoutubeSearcher.isVideoUrl(args) === false) { // If it's not a YouTube video url
                YoutubeSearcher.getVideo(args).then(video => { // Search video
                    connection.play(ytdl(video.url, { filter: 'audioonly' })); // Play the track using ytdl-core
                    message.reply('Now playing ' + video.url);
                });
            } else {
                connection.play(ytdl(args, { filter: 'audioonly' }));
                message.reply('Now playing ' + args);
            };
        } else {
            message.reply('You need to join a voice channel.');
        };
    };
});

client.login(config.token); // Login with Discord bot token