/**
 * @swagger
 * tags:
 *   name: Membership
 *   description: Membership API
 */

/**
 * @swagger
 * /membership:
 *   get:
 *     tags:
 *       - Membership
 *     summary: Get membership status
 *     description: Get the membership status of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 *   post:
 *     tags:
 *       - Membership
 *     summary: Add a membership
 *     description: Add a membership for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Membership added successfully
 *       '400':
 *         description: User already has an active membership
 *       '500':
 *         description: Internal server error

 *   delete:
 *     tags:
 *       - Membership
 *     summary: Remove membership
 *     description: Remove the membership of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Membership cancelled
 *       '404':
 *         description: User does not have an active membership
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /memberships:
 *   patch:
 *     summary: Renew a membership
 *     description: Renew the active membership for the authenticated user.
 *     tags:
 *       - Membership
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully renewed the membership.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Membership renewed
 *       404:
 *         description: User does not have an active membership.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User does not have an active membership
 *       500:
 *         description: An error occurred while renewing the membership.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while renewing the membership
 */
