const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleWare
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("AutoMent Server Home")
})

app.listen(port, () => {
    console.log("Port:", port)
})
