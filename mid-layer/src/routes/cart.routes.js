module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  router.get("/select/:id", controller.one);

  // Create a new post.
  router.post("/", controller.create);

  router.put("/", controller.update);

  // Add routes to server.
  app.use("/api/cart", router);
};
