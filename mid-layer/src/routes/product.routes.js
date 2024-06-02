module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  // Select all products.
  router.get("/", controller.all);

  router.put("/", controller.update); 

  // Add routes to server.
  app.use("/api/products", router);
};
