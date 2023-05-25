/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: Frequently Asked Questions API
 */

/**
 * @swagger
 * /faqs:
 *   get:
 *     tags:
 *       - FAQs
 *     summary: Get all FAQs
 *     description: Retrieve all frequently asked questions.
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 *   post:
 *     tags:
 *       - FAQs
 *     summary: Create a new FAQ
 *     description: Create a new frequently asked question.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               status:
 *                 type: string
 *               user_id:
 *                 type: integer
 *             example:
 *               question: How do I reset my password?
 *               answer: You can reset your password by clicking on the "Forgot Password" link on the login page.
 *               status: active
 *               user_id: 1
 *     responses:
 *       '201':
 *         description: Created
 *       '500':
 *         description: Internal server error

 * /faqs/status/{status}:
 *   get:
 *     tags:
 *       - FAQs
 *     summary: Get FAQs by status
 *     description: Retrieve frequently asked questions based on the specified status.
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         description: Status of the FAQs
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal server error

 * /faqs/{faq_id}:
 *   get:
 *     tags:
 *       - FAQs
 *     summary: Get a specific FAQ
 *     description: Retrieve a specific frequently asked question by ID.
 *     parameters:
 *       - name: faq_id
 *         in: path
 *         required: true
 *         description: ID of the FAQ
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: FAQ not found
 *       '500':
 *         description: Internal server error

 *   put:
 *     tags:
 *       - FAQs
 *     summary: Update an existing FAQ
 *     description: Update an existing frequently asked question by ID.
 *     parameters:
 *       - name: faq_id
 *         in: path
 *         required: true
 *         description: ID of the FAQ
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               question: How do I reset my password?
 *               answer: You can reset your password by clicking on the "Forgot Password" link on the login page.
 *               status: active
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: FAQ not found
 *       '500':
 *         description: Internal server error

 *   delete:
 *     tags:
 *       - FAQs
 *     summary: Delete an existing FAQ
 *     description: Delete an existing frequently asked question by ID.
 *     parameters:
 *       - name: faq_id
 *         in: path
 *         required: true
 *         description: ID of the FAQ
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: FAQ not found
 *       '500':
 *         description: Internal server error
 */
