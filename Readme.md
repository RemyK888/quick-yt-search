[![NPM](https://nodei.co/npm/quick-yt-search.png)](https://nodei.co/npm/quick-yt-search/)

The QuickYtSearch is a simple way to find videos, playlists and channels on YouTube and get informations about them.

**Basic Stuff**
```javascript
const QuickYtSearch = require('quick-yt-search'); // Require the package
const YoutubeSearcher = new QuickYtSearch({
    YtApiKey: 'Your key here', // Place your YouTube API key here
});
```
*Note: The YouTube API key is required.*

**Find YouTube video**
```javascript
YoutubeSearcher.getVideo('some video').then(video => {
    // Do what you want
});
```
**Find YouTube playlist**
```javascript
YoutubeSearcher.getPlaylist('some playlist').then(playlist => {
    // Do what you want
});
```
**Find YouTube channel**
```javascript
YoutubeSearcher.getChannel('some channel').then(channel => {
    // Do what you want
});
```
**Check video URL**
```javascript
if(YoutubeSearcher.isVideoUrl('some video url') === true) {
    console.log('OMG, it\'s a video');
} else {
    console.log('NOPE');
};
```
**Check playlist URL**
```javascript
if(YoutubeSearcher.isPlaylistUrl('some playlist url') === true) {
    console.log('OMG, it\'s a playlist');
} else {
    console.log('NOPE');
};
```
**Check channel URL**
```javascript
if(YoutubeSearcher.isChannelUrl('some channel url') === true) {
    console.log('OMG, it\'s a channel');
} else {
    console.log('NOPE');
};
```
**Video properties**
```javascript
    Video.channelId,
    Video.channelTitle,
    Video.defaultThumbnail,
    Video.description,
    Video.highThumbnail,
    Video.id,
    Video.liveBroadcastContent,
    Video.mediumThumbnail,
    Video.publishedAt,
    Video.publishedTime,
    Video.title,
    Video.url
```
**Playlist properties**
```javascript
    Playlist.channelId,
    Playlist.channelTitle,
    Playlist.defaultThumbnail,
    Playlist.description,
    Playlist.highThumbnail,
    Playlist.id,
    Playlist.liveBroadcastContent,
    Playlist.mediumThumbnail,
    Playlist.publishedAt,
    Playlist.publishedTime,
    Playlist.title,
    Playlist.url
```
**Channel properties**
```javascript
    Channel.createdAt,
    Channel.createdTime,
    Channel.defaultThumbnail,
    Channel.description,
    Channel.highThumbnail,
    Channel.id,
    Channel.liveBroadcastContent,
    Channel.mediumThumbnail, 
    Channel.title,
    Channel.url
```
**Code example** *(with Discord bot, using [discord.js](https://www.npmjs.com/package/discord.js) and [ytdl-core](https://www.npmjs.com/package/ytdl-core))*
```javascript
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
```

*Note: This package is not affiliated with YouTube Inc.*

If you have any problems, you can contact: `RemyK#3876`
**Discord Server:** [Server Link](https://discord.gg/ZCzxymB)


**Made with ❤ by RemyK**
