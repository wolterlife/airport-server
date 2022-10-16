import "reflect-metadata"
const express = require('express');
const router = require('./src/router')
const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/", router)

app.listen(port, () => {console.log(`App listen on port ${port}!`)})
