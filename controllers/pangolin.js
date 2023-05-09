const Pangolin = require("../models/pangolin");
const bcrypt = require("bcrypt");

/* Returns all the pangolins registered  */
exports.getAllPangolins = (req, res, next) => {
    Pangolin.find()
        .then((pangolins) => res.status(200).json(pangolins))
        .catch((error) => res.status(400).json({ error }));
};

/* Create a new pangolin after hashing the password and sends back user informations */
exports.createPangolin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const pangolin = new Pangolin({
            name: req.body.name,
            password: hash,
            role: req.body.role,
            friends: [],
        });
        pangolin
            .save()
            .then(() =>
                res.status(200).json({
                    pangolinId: pangolin._id,
                    friends: pangolin.friends,
                    role: pangolin.role,
                    name: pangoline.name,
                })
            )
            .catch((error) => res.status(400).json({ error }));
    });
};

/* Verify the credentials and if correct returns user informations */
exports.loginPangolin = (req, res, next) => {
    Pangolin.findOne({ name: req.body.name })
        .then((pangolin) => {
            if (!pangolin) {
                return res
                    .status(401)
                    .json({ message: "Incorrect credentials" });
            }
            console.log(pangolin);
            bcrypt
                .compare(req.body.password, pangolin.password)

                .then((valid) => {
                    if (valid === true) {
                        res.status(200).json({
                            pangolinId: pangolin._id,
                            friends: pangolin.friends,
                            role: pangolin.role,
                            name: pangolin.name,
                        });
                    } else {
                        res.status(401).json({
                            message: "Incorrect credentials",
                        });
                    }
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/* Either add a friend or deletes one depending on whether the users are already friend */
exports.changeFriend = (req, res, next) => {
    Pangolin.findOne({ _id: req.body.pangolinId }).then((pangolin) => {
        if (pangolin.friends.includes(req.body.friendName)) {
            Pangolin.updateOne(
                { _id: req.body.pangolinId },
                { $pull: { friends: req.body.friendName } }
            )
                .then(() =>
                    res
                        .status(200)
                        .json({ message: "Pangolin friend deleted :'(" })
                )
                .catch((error) => res.status(400).json({ error }));
        } else {
            Pangolin.updateOne(
                { _id: req.body.pangolinId },
                { $push: { friends: req.body.friendName } }
            )
                .then(() =>
                    res
                        .status(200)
                        .json({ message: "Pangolin added as friend!" })
                )
                .catch((error) => res.status(400).json({ error }));
        }
    });
};

/* Updates the role of the user */
exports.changeRole = (req, res, next) => {
    Pangolin.updateOne(
        { _id: req.body.pangolinId },
        { $set: { role: req.body.role } }
    )
        .then(() =>
            res.status(200).json({ message: "Pangolin added as friend!" })
        )
        .catch((error) => res.status(400).json({ error }));
};
