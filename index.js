const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(cors())


// benjirbhuyan
// PSVsA1vVJqRqEJe6

const db_user =process.env.DB_USER;
const db_pass =process.env.DB_PASS;

const uri = `mongodb+srv://${db_user}:${db_pass}@cluster0.mym2gsq.mongodb.net/?appName=Cluster0`;

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
        // Send a ping to confirm a successful connection
        const woodCollection = client.db("crufts").collection("woodcruft");
        
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