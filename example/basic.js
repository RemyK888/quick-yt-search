const QuickYtSearch = require('quick-yt-search'); // Require the package
const YoutubeSearcher = new QuickYtSearch({
    YtApiKey: 'Your key here', // Place your YouTube API key here
});

YoutubeSearcher.getVideo('some video').then(video => {
    // Do what you want
});

YoutubeSearcher.getPlaylist('some playlist').then(playlist => {
    // Do what you want
});

YoutubeSearcher.getChannel('some channel').then(channel => {
    // Do what you want
});

if(YoutubeSearcher.isVideoUrl('some video url') === true) {
    console.log('OMG, it\'s a video');
} else {
    console.log('NOPE');
};

if(YoutubeSearcher.isPlaylistUrl('some playlist url') === true) {
    console.log('OMG, it\'s a playlist');
} else {
    console.log('NOPE');
};

if(YoutubeSearcher.isChannelUrl('some channel url') === true) {
    console.log('OMG, it\'s a channel');
} else {
    console.log('NOPE');
};

/* 
Video property
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

Playlist property
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

Channel property
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
*/