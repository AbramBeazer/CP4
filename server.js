
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let party = [];
let id = 0;
let partyName = "";

app.get('/api/items', (req, res) => {
  res.send(party);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  partyName = req.body.partyName;
  let item = {id:id, name:req.body.name, class: req.body.class,
     str: req.body.str, dex: req.body.dex, con: req.body.con,
     int: req.body.int, wis: req.body.wis, cha: req.body.cha};
  party.push(item);
  res.send(item);
});

app.put('/api/name', (req, res) => {
  partyName = req.body.partyName;
  res.send(partyName);
});

app.get('/api/name', (req, res) =>{
  res.send(partyName);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = party.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  party.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
