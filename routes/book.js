const express = require("express")

const router = express.Router()

//const book = require("../models/Book")
const Book = require("../models/Book")


// Add a new Book 

router.post('/',async (req,res)=>{
    try {
        const book = new Book(req.body)

        await book.save()

        res.status(201).send(book)
    } catch (error) {

        res.status(400).send(error)
        
    }


})


// Get all Books 

router.get("/", async (req,res)=>{

    const books = await Book.find()

    res.send(books)
})


// Get Book by id 

router.get("/:id",async(req,res)=>{
    const book = await Book.findOne({bookId:req.params.id})
    if(!book) return res.status(400).send("Book not found ")

        res.send(book)
})


// Update Book information 

router.put("/:id",async (req,res)=>{
    const book = await Book.findOneAndUpdate({bookId:req.params.id},req.body)
    if(!book) return res.status(400).send("Book not found ")
        res.send(book)


})

// Delete Book 

router.delete("/:id", async (req,res)=>{
    const results = await Book.deleteOne({bookId:req.params.id})

    if(results.deletedCount===0) return res.status(404).send("Book not found")

        res.send({message:"Book has been deleted"})

})

module.exports=router; 