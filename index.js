const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors());

// {
//     origin: ["https://b9assignment10.web.app"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true
// }



// const db_user = process.env.DB_USER;
// const db_pass = process.env.DB_PASS;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mym2gsq.mongodb.net/?appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const woodCollection = client.db("crufts").collection("allcrufts");
        const cruftUsers = client.db("crufts").collection("cruftusers");
        // Send a ping to confirm a successful connection

        app.get('/addcruft', async (req, res) => {
            const cursor = woodCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/addcruft/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await woodCollection.findOne(query);
            res.send(result)
        })
        app.delete('/addcruft/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await woodCollection.deleteOne(query);
            res.send(result)
        })
        app.post('/addcruft', async (req, res) => {
            const newcruft = req.body;
            console.log(newcruft);
            const result = await woodCollection.insertOne(newcruft);
            res.send(result);
        })
        app.put('/addcruft/:id', async (req, res) => {
            const id = req.params.id;
            const updatedProd = req.body;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const prod = {
                $set: {
                    name: updatedProd.name,
                    catselect: updatedProd.catselect,
                    madeof: updatedProd.madeof,
                    quantity: updatedProd.quantity,
                    photo: updatedProd.photo,
                    price: updatedProd.price,
                    descripion: updatedProd.descripion,
                }
            }
            const result = await woodCollection.updateOne(query, prod, options);
            res.send(result)
        })

        //create users
        app.get('/users', async (req, res) => {
            const cursor = cruftUsers.find();
            const result = await cursor.toArray();
            res.send(result)

        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            console.log(query);
            const result = await cruftUsers.findOne(query);
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const newuser = req.body;
            const result = await cruftUsers.insertOne(newuser);
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('testing if server side is running')
})
app.listen(port, () => {
    console.log(`server side is running on port ${port}`)
})