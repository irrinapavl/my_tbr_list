import pool from '../config/db.js'

export const getBooks = async (req, res) => {
    
  const user_id = req.user.id

  try {
    const books = await pool.query(
      'SELECT * FROM books WHERE user_id = $1 AND finished = FALSE ORDER BY created_at DESC',
      [user_id]
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
  const user_id = req.user.id

  if (!name || !author || !cover) {
    return res.status(400).json({ 
      success: false, 
      message: "All fields are required" 
    })
  }

  try {
    const newBook = await pool.query(
      'INSERT INTO books (name, author, cover, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, author, cover, user_id]
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

export const updateBook = async (req, res) => {

  const { id } = req.params
  const { name, author, cover } = req.body
  const user_id = req.user.id

  try {
    const updatedBook = await pool.query(
      'UPDATE books SET name = $1, author = $2, cover = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [name, author, cover, id, user_id]
    )
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
  const user_id = req.user.id

  try {
    const deletedBook = await pool.query(
      'DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *', 
      [id, user_id]
    )
    if (deletedBook.rows.length === 0) {
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

export const moveToLib = async(req, res) => {

  const { id } = req.params
  const user_id = req.user.id

  try {
    const movedBook = await pool.query(
      'UPDATE books SET finished = TRUE, finished_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *', 
      [id, user_id]
    )
    if (movedBook.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Book not found"
      })
    }

    res.status(200).json({ 
      success: true, 
      data: movedBook.rows[0] 
    })
    
  } catch (err) {
    console.error("Error moving a book", err)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error"
    })
  }
}

export const getLibBooks = async (req, res) => {
    
  const user_id = req.user.id

  try {
    const books = await pool.query(
      'SELECT * FROM books WHERE finished = TRUE AND user_id = $1 ORDER BY finished_at DESC',
      [user_id]
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

export const moveToHome = async(req, res) => {

  const { id } = req.params
  const user_id = req.user.id

  try {
    const movedBook = await pool.query(
      'UPDATE books SET finished = FALSE, finished_at = NULL, rating = NULL WHERE id = $1 AND user_id = $2 RETURNING *', 
      [id, user_id]
    )
    if (movedBook.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Book not found"
      })
    }

    res.status(200).json({ 
      success: true, 
      data: movedBook.rows[0] 
    })
    
  } catch (err) {
    console.error("Error moving a book", err)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error"
    })
  }
}

export const getLibCount = async (req, res) => {

  const user_id = req.user.id
  
  try {
    const count = await pool.query(
      'SELECT COUNT(finished_at) FROM books WHERE user_id = $1',
      [user_id]
    )

    res.status(200).json({ 
      success: true, 
      data: count.rows[0].count
    })

  } catch (err) {
    console.log("Error getting library count", err)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error"
    })
  }
}

export const updateRating = async (req, res) => {

  const { id, rating } = req.params
  const user_id = req.user.id

  try {
    const updated = await pool.query(
      'UPDATE books SET rating = $1 WHERE id = $2 AND user_id = $3 RETURNING id, rating',
      [rating, id, user_id]
    )

    if (updated.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Book not found"
      })
    }

    res.status(200).json({ 
      success: true, 
      data: updated.rows[0]
    })

  } catch (err) {
    console.log("Error updating rating", err)
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error"
    })
  }
}