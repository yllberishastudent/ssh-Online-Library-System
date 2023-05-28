/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Get all books in the library.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error


 * @swagger
* /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               cover_image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 

 * /books/category/{categoryName}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get books by category
 *     description: Get books based on the provided category name.
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         description: Name of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error

 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get a book
 *     description: Get a specific book by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error

 * /books/{bookId}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     description: Delete a specific book by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book removed successfully
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error

 *   patch:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     description: Update a specific book by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the book
 *               author_id:
 *                 type: integer
 *                 description: Updated ID of the book's author
 *               description:
 *                 type: string
 *                 description: Updated description of the book
 *               cover_image_url:
 *                 type: string
 *                 description: Updated URL of the book's cover image
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error

 */
