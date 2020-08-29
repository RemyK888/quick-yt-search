const axios = require('axios');
const VideoElement = require('./utils/VideoElement');
const PlaylistElement = require('./utils/PlaylistElement');
const ChannelElement = require('./utils/ChannelElement');

class QuickYtSearch {
    /**
    * @typedef {object} Options
    * @property {string} YtApiKey - The YouTube Api key v3 to access to the YouTube Api and get videos.
    */

	/**
	 * YouTube Api key is required.
     * 
	 * @param {Options} options
	 */
    constructor(options) {
        if (!options.YtApiKey) {
            throw new Error('No YouTube API Key inserted.');
        }

        this.YtApiKey = options.YtApiKey;
    };

    async getVideo(youtubeVideo) {
        if (!youtubeVideo) {
            throw new Error('You must enter a search term to find videos.');
        };
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeVideo}&type=video&key=${this.YtApiKey}`);
            return new VideoElement(response);
        } catch (error) {
            throw new Error('An error occurred while retrieving the video.');
        };
    };

    async getPlaylist(youtubePlaylist) {
        if (!youtubePlaylist) {
            throw new Error('You must enter a search term to find playlist.');
        };
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubePlaylist}&type=playlist&key=${this.YtApiKey}`);
            return new PlaylistElement(response);
        } catch (error) {
            throw new Error('An error occurred while retrieving the playlist.');
        };
    };

    async getChannel(youtubeChannel) {
        if (!youtubeChannel) {
            throw new Error('You must enter a search term to find channel.');
        };
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeChannel}&type=channel&key=${this.YtApiKey}`);
            return new ChannelElement(response);
        } catch (error) {
            throw new Error('An error occurred while retrieving the channel.');
        };
    };

    isPlaylistUrl(PlaylistUrl) {
        try {
            new URL(PlaylistUrl);
        } catch (_) {
            return false;
        };
        if (PlaylistUrl.includes('www.youtu') && PlaylistUrl.includes('list=')) {
            return true;
        } else {
            return false;
        };
    };

    isChannelUrl(ChannelUrl) {
        try {
            new URL(ChannelUrl);
        } catch (_) {
            return false;
        };
        if (ChannelUrl.includes('www.youtu') && ChannelUrl.includes('user')) {
            return true;
        } else {
            return false;
        };
    };

    isVideoUrl(VideoUrl) {
        try {
            new URL(VideoUrl);
        } catch (_) {
            return false;
        };
        if (VideoUrl.includes('www.youtu') && VideoUrl.includes('watch')) {
            return true;
        } else {
            return false;
        };
    };

    isLink(LinkUrl) {
        try {
            new URL(LinkUrl);
        } catch (_) {
            return false;
        };
        return true;
    };

};

module.exports = QuickYtSearch;
