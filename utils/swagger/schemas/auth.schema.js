//-------------------SCHEMAS-------------------//
/**
 * @swagger
 * components:
 *  schemas:
 *    LoginUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: mail@mail.com
 *        password:
 *          type: string
 *          example: "password"
*/ 

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginUserResponse:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 9
 *                     email:
 *                       type: string
 *                       example: mail@mail.com
 *                     role:
 *                       type: string
 *                       example: customer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-19T19:34:56.000Z"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eygzdWhiOjksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxMDg3NjkyMd0.mdTg2AGeXgArTkZGmQRgM0zSU-ULUAJpwlWsJRIfaAo"
*/ 
//-------------------END SCHEMAS-------------------//

//-------------------ENDPOINTS-------------------//
/**
 * @swagger
 * /api/v1/login/:
 *   post:
 *     summary: Login de un usuario existente
 *     description: Genera un Json Web Token para las credenciales del usuario existente
 *     tags:
 *       - Auth
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/LoginUserRequest"  
 *     responses:
 *       '200':
 *         description: token generado
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/LoginUserResponse" 
 */
//-------------------END ENDPOINTS-------------------//