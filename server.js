const express = require('express');
const db = require('./db')
const app = express();
const path = require('path'); 


app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/posts', (req, res, next)=> {
  try {
    res.send( await(db.findAllPosts()));
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/tags', (req, res, next)=> {
  try{
    res.send( await(db.findAllTags()));
  }
  catch(ex){
    next(ex);
  }
});

app.listen(3000, ()=> console.log('listening on port 3000'));



db.syncAndSeed()
  .then(()=> console.log('done'));