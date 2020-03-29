const express = require('express');
const NewsAPI = require('newsapi');
const mysql = require('mysql');
const connection = require('./mysql/news');
require('dotenv').config();

const app = express();

app.get('/atualizacao', () => {
  const newsapi = new NewsAPI(process.env.NEWSAPIKEY);

  newsapi.v2
    .topHeadlines({
      q: 'covid',
      language: 'pt',
    })
    .then((response) => {
      connection.connect();
      response.articles.forEach((e) => {
        const news = {
          fonte: e.source.name,
          title: e.title,
          description: e.description,
          url_to_link: e.url,
          url_to_image: e.urlToImage,
          published_at: e.publishedAt,
        };

        const query = connection.query(
          'INSERT INTO news SET ?',
          news,
          (error, results, fields) => {
            if (error) throw error;
          },
        );
      });
      connection.end();
    })
    .catch((e) => console.log(e));
});

app.get('/', (req, res) => {
  connection.connect();
  const limit = 10;

  const page = (parseInt( req.query.page || 1 ) - 1) * limit;

  let query = 'SELECT * FROM ?? limit ? offset ?';
  const table = ['news_api.news', limit, page];
  query = mysql.format(query, table);

  connection.query(query, (error, results, fields) => {
    if (error) console.log(error);
    res.send(results);
  });
  connection.end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});
