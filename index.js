require('dotenv').config();
const axios = require('axios');

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const GRAPH_API_VERSION = 'v18.0';

async function getPopularMusic() {
    const endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/audio/recommendations`;
    const params = {
        type: 'FACEBOOK_POPULAR_MUSIC',
        access_token: ACCESS_TOKEN,
    };

    try {
        const response = await axios.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular music:', error.response.data || error.message);
    }
}

async function getNewMusic() {
    const endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/audio/recommendations`;
    const params = {
        type: 'FACEBOOK_NEW_MUSIC',
        access_token: ACCESS_TOKEN,
    };

    try {
        const response = await axios.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching new music:', error.response.data || error.message);
    }
}

async function getMusicForYou() {
    const endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/audio/recommendations`;
    const params = {
        type: 'FACEBOOK_FOR_YOU',
        access_token: ACCESS_TOKEN,
    };

    try {
        const response = await axios.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching music for you:', error.response.data || error.message);
    }
}

// Example usage:
getPopularMusic().then((data) => {
    const popularMusic = data.data.map(({ title, artist }) => `${title} by ${artist}`).join(';\n');
    console.log(' - Popular Music - \n', popularMusic);

    try {
        axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/sendMessage`, {
            text: popularMusic,
            chat_id: process.env.TELEGRAM_GROUP_ID,
            parse_mode: 'markdown',
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error sending Telegram message:', error.response.data || error.message || error);
    }
});

// getNewMusic().then((data) => {
//     console.log(' - New Music - \n', data.data.map(({ title, artist }) => `${title} by ${artist}`).join(';\n'));
// });
//
// getMusicForYou().then((data) => {
//     console.log(' - Music For You - \n', data.data.map(({ title, artist }) => `${title} by ${artist}`).join(';\n'));
// });
