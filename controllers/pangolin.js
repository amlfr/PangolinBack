const Pangolin = require("../models/pangolin");
const bcrypt = require("bcrypt");

exports.getAllPangolins = (req, res, next) => {
    Pangolin.find()
        .then((pangolins) => res.status(200).json(pangolins))
        .catch((error) => res.status(400).json({ error }));
};

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
                })
            )
            .catch((error) => res.status(400).json({ error }));
    });

    /* onst pangolinObject = JSON.parse(req.body.pangolin); */
};

exports.loginPangolin = (req, res, next) => {
    Pangolin.findOne({ name: req.body.name })
        .then((pangolin) => {
            if (!pangolin) {
                return res
                    .status(401)
                    .json({ message: "Paire login/mot de passe incorrecte" });
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
                        });
                    } else {
                        res.status(401).json({
                            message: "Paire login/mot de passe incorrecte",
                        });
                    }
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.addFriend = (req, res, next) => {
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
