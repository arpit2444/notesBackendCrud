const express = require("express");
const {NoteModel}= require("../Model/noteModel")
const notesRouter = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      Note:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: auto-generated id for note
 *              title:
 *                  type: string
 *                  description: the title of note
 *              category:
 *                  type: string
 *                  description: the category of note
 *              user:
 *                  type: string
 *                  description: added automatically to body from middleware                                                             
 */


/**
* @swagger
* tags:
*   name: Notes
*   description: All the API routes related to User
*/

/**
 * @swagger
 * /notes:
 *  get:
 *      summary: it will get all the notes from database
 *      tags: [notes]
 *      responses:
 *          200:
 *              description: the list of all notes
 *              content:    
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Note"
 */





notesRouter.get("/",async(req,res)=>{
    try{
    const note= await NoteModel.find()
    res.send(note)}
    catch(err){res.send({"error":err.message})}
})


/**
 * @swagger
 * /notes/create:
 *  post:
 *      summary: to post the details of a new note
 *      tags: [notes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                  $ref: "#/components/schemas/Note"
 *      responses:
 *          200:
 *              description: the note has created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Note"
 *          500:
 *              description: some server error        
 * 
 */



notesRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try{
    const note = new NoteModel(payload)
    await note.save()
     res.send("note created")}
     catch(err){res.send({"error":err.message})}
})


/**
 * @swagger
 * /notes/update/{id}:
 *  patch:
 *      summary: it will update the note
 *      tags: [notes]
 *      parameters:
 *          -in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: note id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                  $ref: "#/components/schemas/Note"
 *      responses:
 *          200:
 *              description: the note has created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Note"
 *          404:
 *              description: note is not found
 *          500:
 *              description: some server error        
 * 
 */



notesRouter.patch("/update/:id",async(req,res)=>{
    const Id = req.params.id;
    const note = await NoteModel.find({_id:Id,user:req.body.user})
    console.log(note)
    try{
        if(note.length>0){
        await NoteModel.findByIdAndUpdate({_id:Id},req.body)
        res.send("updated succesfully")}
        else{res.send("you are not authorized")}
    } catch(err){res.send({"error":err.message})}
})


/**
 * @swagger
 * /notes/delete/{id}:
 *  delete:
 *      summary: it will delete the note by id
 *      tags: [notes]
 *      parameters:
 *          -in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: note id
 *      responses:
 *          200:
 *              description: the note has deleted
 *          404:
 *              description: note is not found
 */



notesRouter.delete("/delete/:id",async(req,res)=>{
    const Id = req.params.id;
    const note = await NoteModel.find({_id:Id,user:req.body.user})
    console.log(note)
    try{
        if(note.length>0){
        await NoteModel.findByIdAndDelete({_id:Id},req.body)
        res.send("deleted succesfully")}
        else{res.send("you are not authorized")}
    } catch(err){res.send({"error":err.message})}
})





module.exports={
    notesRouter
}