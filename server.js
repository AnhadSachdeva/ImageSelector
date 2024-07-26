const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); 


app.get('/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'public/images');

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading images directory');
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.json({ images: imageFiles });
  });
});


app.post('/save-votes', (req, res) => {
  const votes = req.body;
  fs.writeFile(path.join(__dirname, 'votes.json'), JSON.stringify(votes, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error saving votes');
    }
    res.send({ status: 'Votes saved' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
