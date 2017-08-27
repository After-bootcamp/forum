const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const _port = process.argv[2] || process.env.PORT || 3005;

app.use(bodyparser.json);
app.use(express.static('public'));

app.listen(_port , console.log(`server listening on ${_port}`));
