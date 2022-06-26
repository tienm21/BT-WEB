const express = require('express');
const Config = require('./config/serverConfig');
const route = require('./routes/api');



const app = express();
const port = 5055;

Config(app);

//routes

app.use(route)

app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
})

