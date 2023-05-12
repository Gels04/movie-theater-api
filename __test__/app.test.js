const {describe, test, it, expect} = require("@jest/globals");
const request = require("supertest"); //
const app = require("../app");
const {db} = require("../db/connection");
const seed = require("../seed");
const User = require("../models/User");
const Show = require("../models/Show");

describe("Users", () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await seed();
    });

    it("GET all users from the database", async () => {
        const response = await request(app).get("/users"); //request(app) acts as our server, and receives the endpoint of app
        const users = response.body; //returns all info within the content body (response has both body and header(metadata) info)
        expect(users.length).toBe(2);
    });

    it("GET one user from the database", async() => {
        const response = await request(app).get("/users/1");
        const user = response.body;
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("password");
    })

    it("GET all shows that the user watched", async() => {
        const response = await request(app).get("/users/1/shows");
        const allShowsWatched = await response.body;
        const user1 = await User.findByPk(1);
        const allShows = await user1.getShows();
        expect(allShowsWatched.length).toBe(allShows.length); //making sure the length of movies user watched is the same as the one in the database
    });

    it.skip("PUT updates/adds a show if the user has watched it", async() => {
        const response = await request(app).put("/users/1/shows/9");
        const updatedUserShows = response.body;
        console.log(updatedUserShows, await Show.findByPk(9));
        expect(updatedUserShows).toEqual(await Show.findByPk(9));
    })
})

describe("Shows", () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await seed();
    });

    it("GET all shows from the databse", async() => {
        const response = await request(app).get("/shows");
        const allShows = await response.body;
        expect(allShows.length).toBe(11);
    })
})


//Users GET
//GET all users from the databse
//GET one user from the database
//GET all shows that the user watched - eg /users/:2/shows returns all shows the 2nd user from the database watched

//Users PUT
//PUT updates and adds a show if a user has watched it - eg /users/:2/shows/:9 should add the 9th show from the database to the User using addShow() method



//TODO: Shows GET
//GET all shows from the database;
//GET one show from the database;
//GET shows of a particular genre - eg "comedy" only returns shows with comdey genre

//Shows PUT
//PUT updates the rating of a show that has been watched - eg /shows/4/watched/:rating would update the forth show's rating
//PUT updates the status of a show - eg /shows/3/:updates should update the 3rd show's status to "cancelled" or "on-going"

//Shows DELETE
//DELETE a show