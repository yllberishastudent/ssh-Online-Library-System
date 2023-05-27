/**
 * @swagger
 * tags:
 *   name: Author
 *   description: Author API
 */

/**
 * @swagger
 * /author/{id}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get author info
 *     description: Get information about an author by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Author not found
 *       '500':
 *         description: Internal server error

 * /author/{id}/books:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get books by author ID
 *     description: Get all books written by a specific author.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Author not found
 *       '500':
 *         description: Internal server error

 * /author:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get all authors
 *     description: Get information about all authors.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 *   patch:
 *     tags:
 *       - Author
 *     summary: Update an author
 *     description: Update the properties of an author.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               pen_name:
 *                 type: string
 *               gender:
 *                 type: string
 *               country:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               first_name: John
 *               last_name: Doe
 *               pen_name: J. Doe
 *               gender: Male
 *               country: USA
 *               active: true
 *     responses:
 *       '200':
 *         description: Author updated successfully
 *       '404':
 *         description: Author not found
 *       '500':
 *         description: Internal server error

 *   delete:
 *     tags:
 *       - Author
 *     summary: Delete an author
 *     description: Delete an author by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     responses:
 *       '200':
 *         description: Author deleted successfully
 *       '404':
 *         description: Author not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               pen_name:
 *                 type: string
 *               gender:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */
