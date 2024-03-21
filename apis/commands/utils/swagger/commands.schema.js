//-------------------SCHEMAS-------------------//
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateCommandRequest:
 *      type: object
 *      required:
 *        - order
 *        - command
 *      properties:
 *        order:
 *          type: integer
 *          example: 0
 *        command:
 *          type: string
 *          enum: [BACK, FORDWARD, LEFT, RIGHT]
 *          example: 0_BACK
*/ 
//-------------------END SCHEMAS-------------------//

//-------------------ENDPOINTS-------------------//
/**
 * @swagger
 * /api/v1/commands/{user_id}:
 *   get:
 *     summary: Obtiene comandos no procesados
 *     description: Obtiene todos los comandos para un usuario. Borra los comandos leídos. Es necesario ser admin.
 *     tags:
 *       - Commands
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id del usuario
 *     responses:
 *       '200':
 *         description: OK. Usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: 0_BACK
 *                 description: Cadena de texto
 */

/**
 * @swagger
 * /api/v1/commands/:
 *   get:
 *     summary: Obtiene comandos no procesados
 *     description: Obtiene todos los comandos para el usuario autenticado. Borra los comandos leídos
 *     tags:
 *       - Commands
 *     security:
 *       - JWT: []
 *     responses:
 *       '200':
 *         description: OK. Usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: 0_BACK
 *                 description: Cadena de texto
 */

/**
 * @swagger
 * /api/v1/commands/:
 *   post:
 *     summary: Crea un comando
 *     description: Crea un comando para el usuario autenticado. Para repetir comandos iguales se debe concatenar el ORDER al principio
 *     tags:
 *       - Commands
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/CreateCommandRequest"  
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Registro agregado exitosamente. La lista de comandos expirará en 100 segundos          
 */

/**
 * @swagger
 * /api/v1/commands/{user_id}:
 *   delete:
 *     summary: Elimina todos los comandos de un usuario
 *     description: Elimina todos los comandos de un usuario. Es necesario ser admin.
 *     tags:
 *       - Commands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id del usuario
 *     security:
 *       - JWT: []
 *     responses:
 *       '204':
 *         description: OK. 
 */
//-------------------END ENDPOINTS-------------------//