/**
 * @swagger
 * tags:
 *   name: User Details
 *   description: API endpoints for User Details
 */

/**
 * @swagger
 * /userdetails:
 *   get:
 *     summary: Get user details by user ID
 *     description: Retrieves the user details for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [User Details]
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       404:
 *         description: User details not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /userdetails:
 *   post:
 *     summary: Create or update user details
 *     description: Creates or updates the user details for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [User Details]
 *     requestBody:
 *       description: User details object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               ethnicity:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details created or updated successfully.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /userdetails:
 *   delete:
 *     summary: Delete user details
 *     description: Deletes the user details for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags: [User Details]
 *     responses:
 *       200:
 *         description: User details deleted successfully.
 *       404:
 *         description: User details not found.
 *       500:
 *         description: Server error.
 */
