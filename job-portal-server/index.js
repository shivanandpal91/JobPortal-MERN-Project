const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser= require('body-parser');
const port = process.env.PORT || 8080

const AuthRouter = require('./Routers/AuthRouter') 
const ProductRouter = require('./Routers/ProductRouter')
const UserRouter = require('./Routers/UserRouter');
const NewsLetterRouter=require('./Routers/NewsLetterRouter')


require('dotenv').config();

require('./Models/db');

//middleware
var corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials:true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json({ limit: '5mb' })); // or more, if needed
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/user', UserRouter);
app.use('/newsletter', NewsLetterRouter);

// require('dotenv').config()
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri=`mongodb+srv://palmanish200:${process.env.DB_PASSWORD}@mernprojectlatest.9sbz61t.mongodb.net/?retryWrites=true&w=majority&appName=mernprojectlatest`;
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
    
 // ✅ Make jobCollections available to route files as i have to use it to get the info of postedBy form jobs (finding through job._id) in UserRoutes
    app.locals.jobCollections = jobCollections;
    
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
//  when we go to  edit-job page  (my-job page) 
app.get("/alljobs/:id",async (req,res)=>{
  console.log(req.params.id)
  const id=req.params.id;
  const job=await jobCollections.findOne({_id:new ObjectId(id)});
  res.send(job);
})

 //get all jobs by email (my-job page) 
 app.get("/myJobs/:email",async (req,res)=>{
  console.log(req.params.email);
  const jobs=await jobCollections.find({postedBy:req.params.email }).toArray();
  res.send(jobs);
 })


    //delete a job     (my-job page) 

    app.delete("/job/:id",async (req,res)=>{
      const id=req.params.id;
      const filter={_id:new ObjectId(id)}
      const result=await jobCollections.deleteOne(filter);
      res.send(result);
    })


    //for updating a job we are using patch method from frontend to server and same here also fromm server to mongodb

    //updateJob page
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




app.get("/ping",(req,res)=>{
    res.send("pong")
})
app.listen(port,()=>{
    console.log(`server is running at Port ${port}`);
})
