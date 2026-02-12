import express from 'express'
import { getBooks, createBook, updateBook, deleteBook, moveToLib, getLibBooks, moveToHome } from '../controllers/bookController.js'

const router = express.Router()

router.get("/", getBooks)
router.post("/", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)
router.post("/tolibrary:id", moveToLib)
router.get("/library", getLibBooks)
router.post("/tohome:id", moveToHome)

export default router