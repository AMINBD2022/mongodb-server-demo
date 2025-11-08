const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const { log } = require("console");

// MidleWare for my server

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://mongoServerDB:QsTPl0cK0IjQRBZb@cluster0.ty9bkxj.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("usersDatbase");
    const userCollection = db.collection("UserCollection");

    // Add New Item to the server
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const city = req.query.city;

      console.log(city);
      const query = {};
      if (city) {
        query.city = city;
      }
      const curson = userCollection.find(query);
      const result = await curson.toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. good day You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log(`my server is running in the port ${port}`);
});
