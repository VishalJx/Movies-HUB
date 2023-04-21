const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT||5000;
require("dotenv").config(); 
app.use(cors());
app.use(express.json())
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// MongoDB Connection
require('./mongoDB');
require('./models/movieSchema');

app.use(require('./routes/movieRoutes'))

app.listen(PORT,(req,resp)=>{
    console.log(`Server running on http://localhost:${PORT}`)
});

app.get('/',(req,resp)=>{
    resp.send('Hello World !');
})