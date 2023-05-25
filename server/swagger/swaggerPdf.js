/**
 * @swagger
 * /pdf/{id}:
 *   get:
 *     tags:
 *       - Pdf
 *     summary: Get PDF by ID
 *     description: Retrieve a PDF file by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the PDF file
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: PDF file not found
 *       500:
 *         description: Internal server error
 */
