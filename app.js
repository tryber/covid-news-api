const express = require('express');
const NewsAPI = require('newsapi');
const mysql = require('mysql');
const connection = require('./mysql/news');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors())
app.get('/atualizacao', (req, res) => {

  const newsapi = new NewsAPI(process.env.NEWSAPIKEY);

  newsapi.v2
    .topHeadlines({
      q: 'covid',
      language: 'pt',
    })
    .then((response) => {
      response.articles.forEach((e) => {
        const news = {
          fonte: e.source.name,
          title: e.title,
          description: e.description,
          url_to_link: e.url,
          url_to_image: e.urlToImage,
          published_at: e.publishedAt,
        };

        let query = 'INSERT INTO ?? SET ?';
        const table = ['news', news];
        query = mysql.format(query, table);

        connection.query(query, (error, results, fields) => {
          if (error) console.log(error);
        });
      });
      res.send("ok");
    })
    .catch((e) => console.log(e));
});

app.get('/', (req, res) => {
  const limit = 10;

  const page = (parseInt(req.query.page || 1) - 1) * limit;

  let query = 'SELECT * FROM ?? ORDER BY idnews desc limit ? offset ? ';
  const table = ["news", limit, page];
  query = mysql.format(query, table);

  connection.query(query, (error, results, fields) => {
    if (error) console.log(error);
    res.send(results);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});
