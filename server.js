'use strict';

const db = require('./utils/db');
const app = require('./routes');
const PORT = process.env.PORT || 5000
var path = require('path');

app.listen(PORT, () => console.log(`Listening on localhost:${ PORT }`))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
})

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});