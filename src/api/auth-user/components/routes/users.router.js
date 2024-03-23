const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('../../../../../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema, queryUserSchema } = require('../../../../../schemas/user.schema');
const { checkRoles } = require('../../../../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(queryUserSchema, 'query'),
  getUsers);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  getUserById);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  createUser);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  deleteUser);

async function getUsers(req, res, next) {
  try {
    const users = await service.find(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await service.update(id, body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = router;

