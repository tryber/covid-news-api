
const express = require('express');
const NewsAPI = require('newsapi');
const connection = require('./mysql/news');
require('dotenv').config();

const app = express();

app.get('/', () => {
  const newsapi = new NewsAPI(process.env.NEWSAPIKEY);

  newsapi.v2
    .topHeadlines({
      q: 'covid',
      language: 'pt',
      // country: 'br',
    })
    .then((response) => {
      // const source = response.articles.map((e) => e.source.name);
      // const title = response.articles.map((e) => e.title);
      // const description = response.articles.map((e) => e.description);
      // const url = response.articles.map((e) => e.url);
      // const urlToImage = response.articles.map((e) => e.urlToImage);
      // const publishedAt = response.articles.map((e) => e.publisedAt);
      connection.connect();
      response.articles.forEach((e) => {
        const post = {
          fonte: e.source.name,
          title: e.title,
          description: e.description,
          url_to_link: e.url,
          url_to_image: e.urlToImage,
          published_at: e.publishedAt,
        };

        const query = connection.query(
          'INSERT INTO posts SET ?',
          post,
          (error, results, fields) => {
            if (error) throw error;
            // Neat!
          },
        );
      });
      connection.end();
    })
    .catch((e) => console.log(e));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
