const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Church = require('./../models/Church');

router.use('/:churchId', function (req, res, next) {
    const { churchId = null } = req.params;
    if (!churchId) {
        res.status(400).json({ message: 'Invalid Request' });
        return;
    }
    next();
});

router.get('/', function (req, res, next) {
    Church.find().exec()
        .then((churches) => res.status(200).json(churches))
        .catch(error => res.status(500).json({ error }));
});

router.get('/:churchId', function (req, res, next) {
    const { churchId = null } = req.params;
    Church.findById(churchId).exec()
        .then(church => {
            if (church) {
                res.status(200).json(church);
            } else {
                res.status(404).json({ message: `Church with id ${churchId} not found!` });
            }
        })
        .catch(error => res.status(500).json({ error }));
});

router.post('/', function (req, res, next) {
    const {
        name = null,
        denominationId = null,
        address = null,
        country = null,
        city = null,
        pincode = null
    } = req.body || {};
    const church = new Church({
        _id: new mongoose.Types.ObjectId,
        name,
        denominationId,
        address,
        country,
        city,
        pincode,
    });
    church.save()
        .then(newChurch => res.status(201).json({ newChurch }))
        .catch(err => res.status(500).json({ message: err.message, error: err }));
});

router.patch('/:churchId', function (req, res, next) {
    const { churchId = null } = req.params;
    const church = {};
    for (const key in req.body) {
        church[key] = req.body[key];
    }
    Church.update({ _id: churchId }, { $set: church }).exec()
        .then(updatedChurch => res.status(200).json({ message: 'Church Updated!', church: updatedChurch }))
        .catch(err => res.status(500).json({ message: err.message, error: err }));
})

router.delete('/:churchId', function (req, res, next) {
    const { churchId = null } = req.params;
    Church.deleteOne({ _id: churchId }).exec()
        .then(church => res.status(200).json({ message: 'Church Deleted!', church }))
        .catch(err => res.status(500).json({ message: err.message, church }));
});

module.exports = router;
