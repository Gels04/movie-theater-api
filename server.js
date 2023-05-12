
const express = require("express");
const port = 3000;
const app = require("./app"); //web server listening at port 3000;
const {db} = require("./db/connection");
const seed = require("./seed"); //apparently we need to include seed file into our main server


//listen at the desired port
app.listen(port, async () => {
    await db.sync({force: true});
    await seed()
    console.log('Server listening at http://localhost:3000');
})

