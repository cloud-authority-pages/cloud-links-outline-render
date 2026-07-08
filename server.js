const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

const articles = {};

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head><title>Cloud Links Knowledge Base</title>
<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:20px}</style>
</head>
<body>
<h1>Cloud Links Knowledge Base</h1>
<p>A cloud authority knowledge base for SEO and link building resources.</p>
<ul id="articles"></ul>
<script>
fetch('/api/articles').then(r=>r.json()).then(data=>{
  const ul = document.getElementById('articles');
  data.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = '<a href="/article/'+a.slug+'">'+a.title+'</a>';
    ul.appendChild(li);
  });
});
</script>
</body></html>`);
});

app.get('/api/articles', (req, res) => {
  res.json(Object.values(articles).map(a => ({slug: a.slug, title: a.title})));
});

app.post('/api/articles', (req, res) => {
  const {slug, title, content} = req.body;
  articles[slug] = {slug, title, content, createdAt: new Date()};
  res.json({success: true, slug});
});

app.get('/article/:slug', (req, res) => {
  const article = articles[req.params.slug];
  if (!article) return res.status(404).send('Not found');
  res.send('<h1>'+article.title+'</h1><div>'+article.content+'</div>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Cloud Links KB running on port', PORT));
