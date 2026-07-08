const express = require('express');
const app = express();
app.use(express.json());

const articles = {};

app.get('/', (req, res) => {
  const list = Object.values(articles).map(a =>
    `<li><a href="/article/${a.slug}">${a.title}</a></li>`
  ).join('');
  res.send(`<!DOCTYPE html>
<html>
<head><title>Cloud Links Knowledge Base</title>
<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:20px}
h1{color:#2563eb}li{margin:8px 0}</style>
</head>
<body>
<h1>Cloud Links Knowledge Base</h1>
<p>A cloud authority knowledge base for SEO and link building resources.</p>
<ul>${list || '<li>No articles yet</li>'}</ul>
</body></html>`);
});

app.get('/article/:slug', (req, res) => {
  const a = articles[req.params.slug];
  if (!a) return res.status(404).send('Not found');
  res.send(`<!DOCTYPE html><html><head><title>${a.title}</title></head>
<body><h1>${a.title}</h1><div>${a.content}</div></body></html>`);
});

app.post('/api/articles', (req, res) => {
  const { slug, title, content } = req.body;
  if (!slug || !title) return res.status(400).json({ error: 'slug and title required' });
  articles[slug] = { slug, title, content: content || '', createdAt: new Date() };
  res.json({ success: true, slug, url: `/article/${slug}` });
});

app.get('/api/articles', (req, res) => {
  res.json(Object.values(articles).map(a => ({ slug: a.slug, title: a.title })));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Cloud Links KB running on port', PORT));
