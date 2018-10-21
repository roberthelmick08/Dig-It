const express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var passport = require('passport');
var mongoose = require('mongoose');
var privateKEY = 'MY_SECRET_KEY';
// var privateKEY = fs.readFileSync('../../private.key', 'utf8');

const PlantSchema = require('../model/plants')
const UserSchema = require('../model/user')
var User = mongoose.model('User');

const auth = jwt({
    secret: privateKEY,
    userProperty: 'payload'
});

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**************
 * AUTHENTICATION requests
 ***************/

router.post('/register', (req, res, next) => {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    console.log('IN ROUTES.JS', req);

    var user = new UserSchema();

    user.name = req.body.name;
    user.email = req.body.email;
    user.admin = req.body.admin;
    user.phone = req.body.phone;
    user.zone = req.body.zone;
    user.zip = req.body.zip;
    user.garden = req.body.garden;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
});

router.post('/login', (req, res, next) => {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    console.log("IN PASSPORT AUTHENTICATE 1");
    passport.authenticate('local', function(err, user, info) {
        console.log("IN PASSPORT AUTHENTICATE 2");
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
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
        germStart: req.body.germStart,
        germEnd: req.body.germEnd,
        weeksToHarvest: req.body.weeksToHarvest,
        weeksToSowBeforeLastFrost: req.body.weeksToSowBeforeLastFrost,
        comment: req.body.comment,
        depth: req.body.depth,
        sowingMethod: req.body.sowingMethod,
        sowingSpace: req.body.sowingSpace,
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
                germStart: req.body.germStart,
                germEnd: req.body.germEnd,
                weeksToHarvest: req.body.weeksToHarvest,
                weeksToSowBeforeLastFrost: req.body.weeksToSowBeforeLastFrost,
                comment: req.body.comment,
                depth: req.body.depth,
                sowingMethod: req.body.sowingMethod,
                sowingSpace: req.body.sowingSpace,
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