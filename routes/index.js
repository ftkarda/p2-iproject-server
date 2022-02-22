const router = require("express").Router();
// const movieRoutes = require('./movieRoutes')
// const genreRoutes = require('./genreRoutes')
const authRouter = require("./authRoute.js");
// const customerRouter = require("./customerRoutes")

// const authentication = require("../middlewares/authn");

router.use("/", authRouter);
// router.use("/customers", customerRouter)

// router.use(authentication)

// router.use("/movies", movieRoutes)
// router.use("/genres", genreRoutes)


module.exports = router;
