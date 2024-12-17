const express = require('express');
const axios = require('axios');
const app = express();
const apiKey = 'AIzaSyAjI2MsUcNZBpvTTivyt18Iri9r0XomnVs';

app.set('view engine', 'ejs'); // Defina o template engine

app.get('/search/:videoName', async (req, res) => {
  const videoName = req.params.videoName;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(videoName)}&maxResults=1&type=video&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    const videoId = response.data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    res.render('video', { videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar vídeo');
  }
});

app.listen(9595, () => {
  console.log('Servidor rodando em http://localhost:9595');
});