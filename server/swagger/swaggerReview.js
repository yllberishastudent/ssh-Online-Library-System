/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Review API
 */

/**
 * @swagger
 * /review:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get all reviews
 *     description: Get all reviews.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 *   post:
 *     tags:
 *       - Review
 *     summary: Add a review
 *     description: Add a review for a book.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               review_text:
 *                 type: string
 *               star:
 *                 type: integer
 *             example:
 *               book_id: 5
 *               review_text: This is a great book!
 *               star: 5
 *     responses:
 *       '201':
 *         description: Review added successfully
 *       '400':
 *         description: User or book does not exist
 *       '500':
 *         description: Internal server error

 * /review/books/{bookId}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get reviews by book ID
 *     description: Get all reviews for a specific book.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Book does not exist
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     description: Delete a review from the database by its ID.
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Review not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
