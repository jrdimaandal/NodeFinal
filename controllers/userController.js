const { userDataAccess } = require('../dataAccess');
const emailValidator = require("email-validator");

const getAllUsers = async (req, res, next) => {
    const users = await userDataAccess.getAll();
  
    res.send(users);
  };

const getUserByUsername = async (req, res, next) => {
    const user = await userDataAccess.getUserByUsername(req.params.username);
  
    if (!user) {
        res.status(404).send('username does not exist');
    }
    res.send(user);
  };

const getUserByEmailAddress = async (req, res, next) => {
    const user = await userDataAccess.getUserByEmailAddress(req.params.emailAddress);
  
    if (!user) {
        res.status(404).send('email address does not exist');
    }
    res.send(user);
  };

const deleteUser = async (req, res, next) => {
    await userDataAccess.delete(req.params.username);

    res.sendStatus(200);
  };

const updateUser = async (req, res, next) => {
    const username = req.params.username;
    const payload = req.body;

    await userDataAccess.update(username, payload);

    res.sendStatus(200);
  };

const insertUser = async (req, res, next) => {
    const payload = req.body;
  
    const user = await userDataAccess.insert(payload);
  
    res.status(201).send(user);
  };

const validateUsernameDoesExists = async (req, res, next) => {
    const user = await userDataAccess.getUserByUsername(req.params.username);

    if (user)
        return next();

    res.status(400).send('username does not exist');
  };

const validateEmail = async (req, res, next) => {
    const {emailAddress} = req.body;
    const isValid = emailValidator.validate(emailAddress);
    if (isValid)
        return next();

    res.status(400).send('email is invalid');
  };

const validateUsernameAlreadyExists = async (req, res, next) => {
    const {username} = req.body;

    const user = await userDataAccess.getUserByUsername(username);

    if (!user)
        return next();

    res.status(409).send('username already exists');
  };

const validateEmailAlreadyExists = async (req, res, next) => {
    const {emailAddress} = req.body;

    const user = await userDataAccess.getUserByEmailAddress(emailAddress);

    if (!user)
        return next();

    res.status(409).send('email already exists');
  };

const validateBodyHasNoUsername = async (req, res, next) => {
    const {username} = req.body;

    if (!username)
        return next();

    res.status(400).send('payload should not contain username');
  };


module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserByEmailAddress,
    deleteUser,
    updateUser,
    insertUser,
    validateUsernameDoesExists,
    validateEmail,
    validateUsernameAlreadyExists,
    validateEmailAlreadyExists,
    validateBodyHasNoUsername
};