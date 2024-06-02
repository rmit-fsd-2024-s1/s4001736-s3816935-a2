module.exports = (express, app) => {
  const controller = require("../controllers/cartItem.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  router.get("/findItem", controller.one);

  // Create a new post.
  router.post("/", controller.create);

  router.put("/", controller.update);

  router.delete("/select/:id", controller.delete);

  // Add routes to server.
  app.use("/api/cartItem", router);
};
