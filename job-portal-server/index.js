const express=require('express')
const app=express()
const cors=require('cors')
const port = process.env.PORT || 3000

//middleware
var corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials:true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.use(express.json());


require('dotenv').config()
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mernprojectlatest.9sbz61t.mongodb.net/?retryWrites=true&w=majority&appName=mernprojectlatest`;
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

    const db=client.db("mernJobPortal")
    const jobCollections=db.collection("demoJobs");

    
    // console.log(jobCollections.find({}));
  
    app.post("/post-job",async(req,res) => {
      console.log(req)
        const body=req.body;
        body.createAt =new Date();
        // console.log(body);
        const result=await jobCollections.insertOne(body);
        // console.log(result)
        if(result.insertedId){
             res.status(200).send(result);
        }else {
             res.status(404).send({
                message:"can not insert! Try again Later",
                status:false
            })
        }
    })
    

//    /////get all jobs
   

app.get("/alljobs",async (req,res)=>{
  const jobs=await jobCollections.find({}).toArray();
  console.log(jobs);
   res.send(jobs);
 })



 ////get single jobs using id for editing that job so we need loader to load that data 
//  when we go to  edit-job page

app.get("/alljobs/:id",async (req,res)=>{
  console.log(req.params.id)
  const id=req.params.id;
  const job=await jobCollections.findOne({_id:new ObjectId(id)});
  res.send(job);
})

 //get all jobs by email
 app.get("/myJobs/:email",async (req,res)=>{
  console.log(req.params.email);
  const jobs=await jobCollections.find({postedBy:req.params.email }).toArray();
  res.send(jobs);
 })


    //delete a job

    app.delete("/job/:id",async (req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)}
      const result=await jobCollections.deleteOne(filter);
      res.send(result);
    })


    //for updating a job we are using patch method from frontend to server and same here also fromm server to mongodb
    app.patch("/update-job/:id",async (req,res)=>{
      const id=req.params.id;
      const jobData=req.body;
      const filter={_id:new ObjectId(id)}
      const options={upsert:true};
      const updateDoc={
        $set:{
          ...jobData
        },
      };
      const result=await jobCollections.updateOne(filter,updateDoc,options);
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




app.get("/",(req,res)=>{
    res.send("helo world")
})
app.listen(port,()=>{
    console.log(`server is running at Port ${port}`);
})
