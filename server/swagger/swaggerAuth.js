/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User signup
 *     description: Register a new user.
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
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john
 *               email: john@example.com
 *               phone_number: 1234567890
 *               password: mypassword

 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate user credentials and generate an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john
 *               password: mypassword
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error

 * /auth/password-recovery:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Password recovery
 *     description: Send a password recovery email to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: john@example.com
 *     responses:
 *       '200':
 *         description: Password recovery email sent
 *       '500':
 *         description: Failed to send password recovery email

 * /auth/otp-verification:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: OTP verification
 *     description: Verify the OTP sent for password recovery.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               otp: 123456
 *     responses:
 *       '200':
 *         description: OTP verification successful
 *       '400':
 *         description: Invalid OTP
 *       '500':
 *         description: Failed to verify OTP
 */
