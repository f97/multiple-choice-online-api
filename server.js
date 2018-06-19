'use strict';

const db = require('./utils/db');
const app = require('./routes');
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on localhost:${ PORT }`))

app.get('/', (req, res) => {
    res.send('Version 0.3.6')
})

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});