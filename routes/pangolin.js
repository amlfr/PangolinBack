const express = require("express");
const router = express.Router();

//importing controllers for the book routes

const pangolinCtrl = require("../controllers/pangolin");

router.get("/", pangolinCtrl.getAllPangolins);
router.post("/", pangolinCtrl.createPangolin);
router.post("/login", pangolinCtrl.loginPangolin);
router.post("/friend", pangolinCtrl.addFriend);
router.post("/role", pangolinCtrl.changeRole);

module.exports = router;
