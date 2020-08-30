const QuickYtSearch = require('quick-yt-search'); // Require the package
const Discord = require('discord.js'); // Require Discord.Js
const ytdl = require('ytdl-core'); // Require ytdl-core
const client = new Discord.Client({ disableMentions: 'everyone' }); // Create new Discord client
const YoutubeSearcher = new QuickYtSearch({ // Init the YouTubeSearch system
    YtApiKey: 'Some YouTube Api key', // Place your YouTube API key here
});
const config = {
    token: 'Some Discord bot token', // Place your Discord bot token here
    prefix: '!' // Place your bot prefix here
};

client.on('message', async message => { // When client receive message
    if (message.content.startsWith(config.prefix + 'play')) { // If message starts with '!(prefix)play'
        if (message.member.voice.channel) { // Check if message author is in a voice channel
            let args = message.content.split(' ').slice(1).join(' '); // Define the args
            if (!args) { // If no args in the message
                message.reply('No args inserted.'); // Reply with mention the message author
            };
            message.member.voice.channel.join() // Join the message author voice channel
                .then(connection => {
                    if (YoutubeSearcher.isVideoUrl(args) === false) { // If it's not a YouTube video url
                        YoutubeSearcher.getVideo(args).then(video => { // Search video
                            const volume = { volume: 0.5 }; // Set the volume
                            const dispatcher = connection.play(ytdl(video.url, { filter: 'audioonly' }, volume)); // Play the track using ytdl-core
                            message.reply('Now playing ' + video.url); // Send a message with song informations
                            dispatcher.on("end", () => { // When the stream is finish
                                message.reply('End of the song.');
                                message.member.voice.channel.leave(); // Leave user voice channel
                                dispatcher.end(); // Stop dispatcher
                            });
                        });
                    } else {
                        const volume = { volume: 0.5 }; // Set the volume
                        const dispatcher = connection.play(ytdl(args, { filter: 'audioonly' }, volume)); // Play the track using ytdl-core
                        message.reply('Now playing ' + args); // Send a message with song informations
                        dispatcher.on("end", () => { // When the stream is finish
                            message.reply('End of the song.')
                            message.member.voice.channel.leave(); // Leave user voice channel
                            dispatcher.end();// Stop dispatcher
                        });
                    };
                });
        } else {
            message.reply('You need to join a voice channel.');
        };
    };
});

client.login(config.token); // Login with Discord bot token
