const router = require("express").Router();

//base route
router.get("/", (req, res) => {
    res.send("Hello There!");
});

module.exports = router;