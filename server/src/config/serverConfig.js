const express = require('express');
const cors = require('cors');


function Config(app) {
    app.use(express.urlencoded({
        extended:true
    }))
    app.use(express.json())
    app.use(cors())
}

module.exports = Config;