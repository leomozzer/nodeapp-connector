const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ 'extended': false }))

const port = 8888 || process.env.PORT;

app.use((req, res, next) => {
    next();
})

app.use(require('./routes'));

app.listen(port, () => {
    const { StartUp } = require('./models/Startup')
    StartUp();
    console.log(`Server is running in ${port}`)
})