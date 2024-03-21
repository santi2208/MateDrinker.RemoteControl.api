//-------------------SCHEMAS-------------------//
/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: mail@mail.com
 *        password:
 *          type: string
 *          example: "password"
 *        role:
 *          type: string
 *          enum: [admin, customer]
 *          example: customer
*/ 
/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: mail@mail.com
 *        role:
 *          type: string
 *          enum: [admin, customer]
 *          example: customer
*/ 

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          example: mail@mail.com
 *        role:
 *          type: string
 *          enum: [admin, customer]
 *          example: customer
 *        createdAt:
 *          type: string
 *          format: Date
 *          example: 2024-03-19T19:34:56.786Z
*/ 
//-------------------END SCHEMAS-------------------//

//-------------------ENDPOINTS-------------------//
/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Obtiene usuarios
 *     description: Obtiene una lista de usuarios filtrada por los parámetros proporcionados.
 *     tags:
 *       - Users
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Cantidad máxima de resultados a devolver (opcional)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Cantidad de resultados a saltar antes de comenzar a devolver resultados (opcional)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email del usuario para filtrar resultados (opcional)
 *     responses:
 *       '200':
 *         description: OK. Lista de usuarios obtenida correctamente.
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtiene Usuario por Id
 *     description: Obtiene a un usuario por Id (Admin role required).
 *     tags:
 *       - Users
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
 *                  $ref: "#/components/schemas/CreateUserResponse" 
 */

/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con el email, contraseña y rol proporcionados.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/CreateUserRequest" 
 *     responses:
 *       '201':
 *         description: Usuario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/CreateUserResponse" 
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente
 *     description: Actualiza un usuario existente con los datos proporcionados.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/UpdateUserRequest" 
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: "#/components/schemas/CreateUserResponse" 
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario por ID. (Es necesario ser admin)
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Id del usuario
 *     responses:
 *       '204':
 *         description: Usuario eliminado correctamente.
 */

//-------------------END ENDPOINTS-------------------//