const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//middleWare
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y9ynz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const itemCollection = client.db("autoMent").collection("items");

        // GET Items
        app.get('/items', async (req, res) => {
            const cursor = itemCollection.find()
            const items = await cursor.toArray()
            res.send(items)
        })
        app.get('/items/total', async (req, res) => {
            const items = await itemCollection.estimatedDocumentCount()
            res.send({ items })
        })
        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await itemCollection.findOne(query)
            res.send(item)
        })

        //PUT data
        app.put('/items/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedBody = req.body;
            const options = { upsert: true }
            const updateDoc = {
                $set: updatedBody
            };
            const items = await itemCollection.updateOne(filter, updateDoc, options)
            res.send(items)
        })


    }
    catch (error) {
        console.error(error);
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("AutoMent Server Home")
})

app.listen(port, () => {
    console.log("Port:", port)
})
