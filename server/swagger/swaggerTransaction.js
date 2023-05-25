// Endpoint 1: Get all transactions for a user
/**
 * @swagger
 * /transactions/{userId}/transactions:
 *   get:
 *     summary: Get all transactions for a user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permission
 *       500:
 *         description: Internal server error
 */

// Endpoint 2: Get a specific transaction for a user
/**
 * @swagger
 * /transactions/{transactionId}:
 *   get:
 *     summary: Get a specific transaction for a user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Transaction ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permission
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */

// Endpoint 3: Create a new transaction
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
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
 *               card_type:
 *                 type: string
 *               card_number:
 *                 type: string
 *               ccv:
 *                 type: string
 *               card_date:
 *                 type: string
 *             example:
 *               first_name: John
 *               last_name: Doe
 *               card_type: Visa
 *               card_number: "************1234"
 *               ccv: "***"
 *               card_date: "12/24"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// Endpoint 4: Delete a transaction for a user
/**
 * @swagger
 * /transactions/{transactionId}:
 *   delete:
 *     summary: Delete a transaction for a user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Transaction ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permission
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
