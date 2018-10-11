const express = require('express');
var router = express.Router();

const PlantSchema = require('../model/plants')
const UserSchema = require('../model/user')

/**************
 * AUTHENTICATION requests
 ***************/

/**************
 * USER requests
 ***************/

// GET user login
router.get('/login', (req, res, next) => {
    // UserSchema.findOne(function(err, user){
    //     if(err){
    //         res.json(err);
    //     } else{
    //         res.json(user);
    //     }
    // })
});

// POST register user
router.post('/register', (req, res, next) => {

});

// PUT edit user profile
router.put('/profile/:id', (req, res, next) => {

});

// DELETE plant from DB
router.delete('/profile/:id', (req, res, next) => {

});

/**************
 * PLANT requests
 ***************/

// GET all plants from DB
router.get('/search', (req, res, next) => {
    PlantSchema.find(function(err, items) {
        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }
    });
});

// POST new plant to DB
router.post('/new_plant', (req, res, next) => {
    let newPlant = new PlantSchema({
        botanicalName: req.body.botanicalName,
        commonName: req.body.commonName,
        stage: req.body.stage,
        harvestable: req.body.harvestable,
        img: req.body.img,
        lifeType: req.body.lifeType,
        methodNum: req.body.methodNum,
        sunSchedule: req.body.sunSchedule,
        type: req.body.type,
        variety: req.body.variety,
        zones: req.body.zones,
        timeRecs: {
            germStart: req.body.germStart,
            germEnd: req.body.germEnd,
            weeksToHarvest: req.body.weeksToHarvest,
            weeksToSowBeforeLastFrost: req.body.weeksToSowBeforeLastFrost,
        },
        tips: {
            comment: req.body.comment,
            depth: req.body.depth,
            sowingMethod: req.body.sowingMethod,
            sowingSpace: req.body.sowingSpace,
        }
    });

    newPlant.save((err, item) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ msg: 'Plant has been added successfully' });
        }
    });
});

// PUT edit plant
router.put('/plant/:id', (req, res, next) => {
    PlantSchema.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                botanicalName: req.body.botanicalName,
                commonName: req.body.commonName,
                stage: req.body.stage,
                harvestable: req.body.harvestable,
                img: req.body.img,
                lifeType: req.body.lifeType,
                methodNum: req.body.methodNum,
                sunSchedule: req.body.sunSchedule,
                type: req.body.type,
                variety: req.body.variety,
                zones: req.body.zones,
                timeRecs: {
                    germStart: req.body.germStart,
                    germEnd: req.body.germEnd,
                    weeksToHarvest: req.body.weeksToHarvest,
                    weeksToSowBeforeLastFrost: req.body.weeksToSowBeforeLastFrost,
                },
                tips: {
                    comment: req.body.comment,
                    depth: req.body.depth,
                    sowingMethod: req.body.sowingMethod,
                    sowingSpace: req.body.sowingSpace,
                }
            }
        },
        function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })

});

// DELETE plant from DB
router.delete('/plant/:id', (req, res, next) => {
    PlantSchema.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = router;