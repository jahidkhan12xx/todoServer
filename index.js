const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://todo:jZMFiaQ8a0OD9Txe@cluster0.f3op28d.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();


    const todoCollection = client.db("Todo").collection("AllTodo")


    app.post("/api/v1/todo",async(req,res)=>{
        const data = req.body;
        console.log(data);
        const result = await todoCollection.insertOne(data)
        res.send(result);
    })
    app.get("/api/v1/todo",async(req,res)=>{
        const email = req.query.email;
        console.log(email);
        const query = {userEmail : email}
        const result = await todoCollection.find(query).toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})