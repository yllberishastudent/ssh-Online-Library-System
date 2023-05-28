/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin endpoints
 */

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Add a new user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/users/{userId}:
 *   put:
 *     summary: Update a user
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 * paths:
 *   admin/details/{userId}:
 *     post:
 *       tags:
 *         - Admin
 *       summary: Create or update user details
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user
 *           schema:
 *             type: integer
 *         - in: header
 *           name: Authorization
 *           required: true
 *           description: Token-based authentication
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 ethnicity:
 *                   type: string
 *                 address:
 *                   type: string
 *       responses:
 *         200:
 *           description: User details created or updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   ethnicity:
 *                     type: string
 *                   address:
 *                     type: string
 *         500:
 *           description: Server error
 *     delete:
 *       tags:
 *         - Admin
 *       summary: Delete user details
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           description: ID of the user
 *           schema:
 *             type: integer
 *         - in: header
 *           name: Authorization
 *           required: true
 *           description: Token-based authentication
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User details deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         404:
 *           description: User details not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         500:
 *           description: Server error
 *   admin/userInfo:
 *     get:
 *       tags:
 *         - Admin
 *       summary: Get all user details
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           description: Token-based authentication
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User details retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     ethnicity:
 *                       type: string
 *                     address:
 *                       type: string
 *         500:
 *           description: Server error
 */
