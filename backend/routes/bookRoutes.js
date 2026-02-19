import express from 'express'
import { getBooks, createBook, updateBook, deleteBook, 
         moveToLib, getLibBooks, moveToHome, getLibCount, 
         updateRating } from '../controllers/bookController.js'

const router = express.Router()

router.get("/", getBooks)
router.post("/", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)
router.put("/tolibrary/:id", moveToLib)
router.get("/libcount", getLibCount)
router.get("/library", getLibBooks)
router.put("/tohome/:id", moveToHome)
router.patch("/:id/:rating", updateRating)

export default router