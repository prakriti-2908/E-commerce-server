const express = require("express");
const {
  addProductController,
  getFemaleProductsController,
  getMaleProductsController,
  getKidsProductsController,
  getAccessoriesProductsController,
  getMotherDaughterController,
  getFatherDaughterController,
  getFatherSonController,
  getMotherSonController,
  getCoupleController,
  addWishListController,
  getWishlistController,
  addCartController,
  getCartController,
  removeCartController,
  removeWishListController,
  getAllProducts,
  removeAllCartController,
  getAdminProducts,
  removeProduct,
} = require("../controllers/ProductController");
const upload = require("../middlewares/multerMiddleware");
const isAuthMiddleware = require("../middlewares/isAuthMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

const productRoute = express.Router();

productRoute
  .post("/add-product", upload.single("image"), addProductController)
  .post("/add-wishlist", isAuthMiddleware,addWishListController)
  .post("/add-cart",isAuthMiddleware,addCartController)
  .post("/remove-cart",isAuthMiddleware,removeCartController)
  .post("/remove-all-cart",isAuthMiddleware,removeAllCartController)
  .post("/remove-wishlist",isAuthMiddleware,removeWishListController)
  .post("/remove-product",isAdminMiddleware,removeProduct)
  .get("/get-admin-products",isAdminMiddleware,getAdminProducts)
  .get("/get-wishlist", isAuthMiddleware,getWishlistController)
  .get("/get-cart",isAuthMiddleware,getCartController)
  .get("/female-products", getFemaleProductsController)
  .get("/male-products", getMaleProductsController)
  .get("/kids-products", getKidsProductsController)
  .get("/accessories-products", getAccessoriesProductsController)
  .get("/mother-daughter", getMotherDaughterController)
  .get("/father-daughter", getFatherDaughterController)
  .get("/father-son", getFatherSonController)
  .get("/mother-son", getMotherSonController)
  .get("/couple", getCoupleController)
  .get("/get-all-products",getAllProducts);

module.exports = productRoute;
