const {Router} = require("express");
const router = Router();
const Show = require("../models/Show");

//get all shows from the database
router.get("/", async (req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
})

//get one show from the database
router.get("/:id", async(req, res) => {
    const oneShow = await Show.findByPk(req.params.id);
    res.json(oneShow);
})

//get shows of a particular genre
router.get("/genre/:genre", async (req, res) => {

    const genreShows = await Show.findAll({where: {
        genre: req.params.genre, //attempting to return all shows with the same genre into genreShows
    }})

    res.json(genreShows); 
})

// TESTING
// console.log(Show.findAll({where: {
//     genre: "comedy",
// }}))

router.put("/:id/watched/:rating", async (req, res) => {
    const oneShow = await Show.findByPk(req.params.id);
    const updateShowRating = await oneShow.update({where: {
        rating: req.params.rating,
    }})
    res.json(updateShowRating);
})


module.exports = router;