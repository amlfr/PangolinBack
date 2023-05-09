const express = require("express");
const router = express.Router();
const pangolinCtrl = require("../controllers/pangolin");

/* assigning a path and a method to every routes imported */
router.get("/", pangolinCtrl.getAllPangolins);
router.post("/", pangolinCtrl.createPangolin);
router.post("/login", pangolinCtrl.loginPangolin);
router.post("/friend", pangolinCtrl.changeFriend);
router.post("/role", pangolinCtrl.changeRole);

module.exports = router;
