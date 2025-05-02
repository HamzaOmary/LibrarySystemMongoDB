const express = require("express")

const router = express.Router()

//const bookShop = require("../models/BookShop")
const BookShop = require("../models/BookShop")


// Add a new BookShop 

router.post('/',async (req,res)=>{
    try {
        const bookShop = new BookShop(req.body)

        await bookShop.save()

        res.status(201).send(bookShop)
    } catch (error) {

        res.status(400).send(error)
        
    }


})


// Get all BookShops 

router.get("/", async (req,res)=>{

    const bookShops = await BookShop.find()

    res.send(bookShops)
})


// Get BookShop by id 

router.get("/:id",async(req,res)=>{
    const bookShop = await BookShop.findOne({shopId:req.params.id})
    if(!bookShop) return res.status(400).send("BookShop not found ")

        res.send(bookShop)
})


// Update BookShop information 

router.put("/:id",async (req,res)=>{
    const bookShop = await BookShop.findOneAndUpdate({shopId:req.params.id},req.body)
    if(!bookShop) return res.status(400).send("BookShop not found ")
        res.send(bookShop)


})

// Delete BookShop 

router.delete("/:id", async (req,res)=>{
    const results = await BookShop.deleteOne({shopId:req.params.id})

    if(results.deletedCount===0) return res.status(404).send("BookShop not found")

        res.send({message:"BookShop has been deleted"})

})

module.exports=router; 