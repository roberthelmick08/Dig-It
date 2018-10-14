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

    console.log('in register auth service')
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

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

router.post('/login', (req, res) => {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info) {
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
    });
});

/**************
 * USER requests
 ***************/

// GET user login
router.get('/login', (req, res) => {
    UserSchema.findOne(function(err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    })
});

// PUT edit user profile
router.put('/profile/:id', (req, res, next) => {
    PlantSchema.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin,
                phone: req.body.phone,
                zone: req.body.zone,
                zip: req.body.zip,
                garden: req.body.garden
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

// PUT update user garden
router.put('/garden/:id', (req, res, next) => {
    PlantSchema.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                garden: req.body.garden
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

// DELETE user from DB
router.delete('/plant/:id', (req, res, next) => {
    UserSchema.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
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