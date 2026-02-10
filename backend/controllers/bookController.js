import pool from '../config/db.js'

export const getBooks = async (req, res) => {

    try {
        const books = await pool.query(
            'SELECT * FROM books ORDER BY created_at DESC'
        )
        res.status(200).json({ 
            success: true, 
            data: books.rows
        })
    } catch (err) {
        console.log("Error getting books", err)
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error"
        })
    }
}

export const createBook = async (req, res) => {
    
    const { name, author, cover} = req.body

    if (!name || !author || !cover) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields are required" 
        })
    }
    
    try {
        const newBook = await pool.query(
            'INSERT INTO books (name, author, cover) VALUES ($1, $2, $3) RETURNING *',
            [name, author, cover]
        )
        res.status(201).json({ 
            success: true, 
            data: newBook.rows[0] 
        })
    } catch (err) {
        console.log("Error creating a book", err)
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error"
        })
    }
}

export const getBook = async (req, res) => {

    const { id } = req.params

    try {
        const Book = await pool.query(
            'SELECT * FROM books WHERE id = $1', [id]
        )
        res.status(200).json({ 
            success: true, 
            data: Book.rows[0] 
        })
    } catch (err) {
        console.log("Error getting a book", err)
        res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        })
    }
}

export const updateBook = async (req, res) => {

    const { id } = req.params
    const { name, author, cover } = req.body

    try {
        const updatedBook = await pool.query(
            'UPDATE books SET name = $1, author = $2, cover = $3 WHERE id = $4 RETURNING *',
            [name, author, cover, id]
        )

        console.log(updatedBook)

        if (updatedBook.rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Book not found"
            })
        }

        res.status(200).json({ 
            success: true, 
            data: updatedBook.rows[0] 
        })
    } catch (err) {
        console.log("Error updating a book", err)
        res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        })
    }
}

export const deleteBook = async (req, res) => {

    const { id } = req.params

    try {
        const deletedBook = await pool.query(
            'DELETE FROM books WHERE id = $1 RETURNING *', [id]
        )

        if (deletedBook.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Book not found"
            })
        }

        res.status(200).json({ 
            success: true, 
            data: deletedBook.rows[0] 
        })
        
    } catch (err) {
        console.error("Error deleting a book", err)
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error"
        })
    }
}