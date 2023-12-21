const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send('task home')
})


const uri = "mongodb+srv://task_management:uilmyLVYEnmkWlUF@cluster0.sinogwr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const database = client.db("task_management");
    const Tasks = database.collection("Tasks");

    app.post("/task", async(req, res) => {
        const task = req.body;
        const result = await Tasks.insertOne(task)
        res.send(result)
    })

    app.get("/task/:email", async (req, res) => {
      const email = req.params.email;
      const filter = {userEmail: email}
      const result = await Tasks.find(filter).toArray();
      res.send(result)
    })


    app.delete("/task/:id", async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await Tasks.deleteOne(filter)
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log("server is running");
})