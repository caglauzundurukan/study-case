const { where } = require('sequelize');
const {authMW, Roles} = require('../middleware/auth');
const Users = require('../model/user');
const express = require('express');

const router = express.Router();

router.use(authMW);

router.get('/', (req, res) => {
    try {
        Users.findAll().then((users) => {
            res.send(users);
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/:id', (req, res) => {
    if (req.user.role !== Roles.ADMIN) {
        return res.status(401).send({ error: 'You are not authorized to perform this action.' });
    }

    try {
        Users.findOne({ where: { id: req.params.id } }).then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/', (req, res) => {
    if (req.user.role !== Roles.ADMIN) {
        return res.status(401).send({ error: 'You are not authorized to perform this action.' });
    }

    try {
        Users.create(req.body).then((user) => {
            res.status(201).send(user);
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', (req, res) => {
    if (req.user.role !== Roles.ADMIN) {
        return res.status(401).send({ error: 'You are not authorized to perform this action.' });
    }

    try {
        Users.update(req.body, { where: { id: req.params.id } }).then((user) => {
            res.send(user);
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/:id', (req, res) => {
    if (req.user.role !== Roles.ADMIN) {
        return res.status(401).send({ error: 'You are not authorized to perform this action.' });
    }

    try {
        Users.destroy({where: { id: req.params.id }}).then(() => {
            res.send({"message": "user deleted"});
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
