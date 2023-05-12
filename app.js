const express = require("express");
const app = express();
const userRouter = require("./routes/user"); //importing router from user.js into application
const showRouter = require("./routes/show"); //importing router from show.js into application

//User Handler
//must use .use() when using express routers
app.use("/users", userRouter); //only handles urls that start with /users - will automatically direct client to userRouter(s) in user.js

//show Handler
app.use("/shows", showRouter); //only handles urls that start with /shows - will automatically direct client to the showRouter(s) in show.js


module.exports = app;