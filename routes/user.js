const {Router} = require("express");
const router = Router();
const User = require("../models/User");

//get all users from the database
router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}) 

//get one user from the database
router.get("/:id", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    res.json(oneUser);
})

//get all the shows the user watched
router.get("/:id/shows", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    const userShows = await oneUser.getShows();
    res.json(userShows);
})

//adds a show if the user has watched it
router.put("/:id/shows/:showNumber", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    const updatedUserShows = await oneUser.addShow(req.params.showNumber);
    res.json(updatedUserShows);

})


module.exports = router;