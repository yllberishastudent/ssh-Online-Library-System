/**
 * @swagger
 * tags:
 *   name: User-history
 *   description: User History API
 */

/**
 * @swagger
 * /history/user:
 *   post:
 *     tags:
 *       - User-history
 *     summary: Add book to user history
 *     description: Add a book to the user's history.
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
 *                 description: ID of the book to add to the history
 *               activityType:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Book added to history successfully
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error

 *   get:
 *     tags:
 *       - User-history
 *     summary: Get user's history
 *     description: Get the history of books for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 * /history/user/{bookId}:
 *   delete:
 *     tags:
 *       - User-history
 *     summary: Delete book from user history
 *     description: Delete a book from the user's history.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID of the book to delete from the history
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: History entry deleted successfully
 *       '404':
 *         description: History entry not found
 *       '500':
 *         description: Internal server error

 * /history/all:
 *   delete:
 *     tags:
 *       - User-history
 *     summary: Clear user's history
 *     description: Delete all history entries for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: History cleared successfully
 *       '404':
 *         description: No history entries found for the user
 *       '500':
 *         description: Internal server error

 */
