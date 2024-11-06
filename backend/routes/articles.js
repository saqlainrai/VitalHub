
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.urlencoded({ extended: true }));

router.get('/data', async (req, res) => {
    let response;
    try {
        const query = "Health and Fitness";
        const apiKey = '3d0cad123c044ee59632e4ff38c3dd7b';
        const url = `https://newsapi.org/v2/everything?q=${query}&from=2024-10-06&sortBy=publishedAt&apiKey=${apiKey}`
        let data = await axios.get(url);

        response = data.data.articles.slice(0, 30);
        response = response.filter(item => item.title != '[Removed]')
        res.json(response);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;