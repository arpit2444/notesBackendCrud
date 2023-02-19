const express = require("express");
const {connection} = require("./db");
require('dotenv').config()
const {userRouter} = require("./router/User.Router")
const {notesRouter} = require("./router/Notes.Router")
const {authorization}= require("./middleware/authetication");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors =require("cors");

const app = express()

app.use(cors())
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learning swagger',
      version: '1.0.0',
    },
    servers:[
      {
        url:"http://localhost:4500"
      }
    ]
  },
  apis: ['./router/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.use("/user",userRouter);

app.use(authorization)

app.use("/notes",notesRouter)

app.get("/",(req,res)=>{
  res.send({"msg":"add notes in url parameter"})
})

app.listen(process.env.port,async()=>{
  await connection
  console.log("server is running")
})