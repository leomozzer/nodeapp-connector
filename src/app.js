const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ 'extended': false }))

app.use(require('./routes'));

const port = 8888 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})