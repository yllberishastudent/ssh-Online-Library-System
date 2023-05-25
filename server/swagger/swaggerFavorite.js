/**
 * @swagger
 *
 * /favorites:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Get all favorites for a user
 *     description: Retrieve all favorite books for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     tags:
 *       - Favorites
 *     summary: Add a book to favorites
 *     description: Add a book to the favorites list of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID of the book to add to favorites
 *             required:
 *               - bookId
 *     responses:
 *       201:
 *         description: Book added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 favorite:
 *                   $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 *
 * /favorites/{bookId}:
 *   delete:
 *     tags:
 *       - Favorites
 *     summary: Remove a book from favorites
 *     description: Remove a book from the favorites list of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book to remove from favorites
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Internal server error
 *
 * /favorites/{bookId}/liked:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Check if a book is liked
 *     description: Check if a book is liked by the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book to check if liked
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   description: Indicates if the book is liked by the user
 *       500:
 *         description: Internal server error
 */
