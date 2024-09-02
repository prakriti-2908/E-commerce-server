const mongoose = require("mongoose");
const {
  addProductModel,
  getFemaleProductsModel,
  getMaleProductsModel,
  getKidsProductsModel,
  getAccessoriesProductsModel,
  getMotherDaughterModel,
  getMotherSonModel,
  getFatherSonModel,
  getFatherDaughterModel,
  getCoupleModel,
  getWishlistModel,
  getCartModel,
  removeCartModel,
  removeWishlistModel,
} = require("../models/ProductModel");
const wishListSchema = require("../schemas/wishListSchema");
const cartSchema = require("../schemas/cartSchema");
const productSchema = require("../schemas/productSchema");

const addProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      isDiscount,
      discountPercent,
      category,
      isCombo,
      combo,
      company,
    } = req.body;
    // console.log(req.body, "body of add product req");

    const productData = {
      name,
      description,
      price: Number(price),
      isDiscount: isDiscount === "true",
      isCombo: isCombo === "true",
      discountPercent: discountPercent ? Number(discountPercent) : null,
      category,
      image: req.file ? `uploads/${req.file.filename}` : null,
      combo,
      company,
    };

    // Validate required fields
    if (
      !company ||
      !name ||
      !description ||
      !productData.price ||
      !category ||
      !productData.image
    ) {
      // console.log("fields not there");
      return res.status(400).send({
        message: "All fields are required",
        status: 400,
      });
    }

    // Save the product to the database
    const result = await addProductModel(productData);
    // console.log("result add product", result);

    if (result.success) {
      res.status(201).send({
        message: "Product added successfully",
        status: 201,
        product: result.product,
      });
    } else {
      res.status(500).send({
        message: "Failed to add product",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      status: 500,
      error,
    });
  }
};

const getFemaleProductsController = async (req, res) => {
  try {
    const response = await getFemaleProductsModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getMaleProductsController = async (req, res) => {
  try {
    const response = await getMaleProductsModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getKidsProductsController = async (req, res) => {
  try {
    const response = await getKidsProductsModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAccessoriesProductsController = async (req, res) => {
  try {
    const response = await getAccessoriesProductsModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getMotherDaughterController = async (req, res) => {
  try {
    const response = await getMotherDaughterModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getMotherSonController = async (req, res) => {
  try {
    const response = await getMotherSonModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFatherSonController = async (req, res) => {
  try {
    const response = await getFatherSonModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getFatherDaughterController = async (req, res) => {
  try {
    const response = await getFatherDaughterModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getCoupleController = async (req, res) => {
  try {
    const response = await getCoupleModel();
    if (response.success) {
      return res.status(200).send({
        message: "Products fetched successfully",
        status: 200,
        products: response.products,
      });
    } else {
      res.status(500).send({
        message: "Failed to fetch products",
        status: 500,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addWishListController = async (req, res) => {
  const { productId } = req.body;
  const usersId = req.session.user.userId; // `let` to allow reassignment

  try {
    // Convert productId and userId to ObjectId
    const convertedProductId = new mongoose.Types.ObjectId(productId);
    const userId = new mongoose.Types.ObjectId(usersId);

    const wishlist = new wishListSchema({
      productId: convertedProductId,
      userId,
    });

    const wishListDb = await wishlist.save();

    return res.status(201).send({
      status: 201,
      message: "Successfully added to wishlist",
      wishListDb,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getWishlistController = async (req, res) => {
  const userId = req.session.user.userId;
  try {
    const response = await getWishlistModel(userId);
    if (response.success) {
      return res.send({
        status: 200,
        message: "Products are fetched successfully",
        products: response,
      });
    } else {
      return res.send({
        status: 500,
        message: "Failed to fetch products",
        error: response.error,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};

const addCartController = async (req, res) => {
  const { productId } = req.body;
  const usersId = req.session.user.userId;
  // console.log(req.session);

  try {
    const convertedProductId = new mongoose.Types.ObjectId(productId);
    const userId = new mongoose.Types.ObjectId(usersId);
    if (!userId) {
      return res.send({ message: "no user Id bhk", session: req.session });
    }

    const existingCart = await cartSchema.findOne({
      userId,
      productId: convertedProductId,
    });
    if (existingCart) {
      return res.status(409).send({
        status: 409,
        message: "This product already exists in the cart.",
      });
    }

    const cart = new cartSchema({
      productId: convertedProductId,
      userId,
    });

    const cartDb = await cart.save();

    return res.status(201).send({
      status: 201,
      message: "Successfully added to cart",
      cartDb,
    });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000) {
      return res.status(409).send({
        status: 409,
        message: "This product already exists in the cart.",
      });
    }
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getCartController = async (req, res) => {
  const userId = req.session.user.userId;

  try {
    const response = await getCartModel(userId);
    if (response.success) {
      return res.send({
        status: 200,
        message: "Products are fetched successfully",
        products: response,
      });
    } else {
      return res.send({
        status: 500,
        message: "Failed to fetch products",
        error: response.error,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};
 
const removeWishListController = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user.userId;
  try {
    const response = await removeWishlistModel({ productId, userId });
    if (response.success) {
      return res.send({
        status: 200,
        message: "Product successfully removed from wishlist",
        deletedProduct: response.deletedProduct,
      });
    } else {
      return res.send({
        status: 500,
        message: "Error in deleting product from wishlist",
        error: response.error,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: response.error,
    });
  }
};

const removeCartController = async (req, res) => {
  const { productId } = req.body;
  const userId = req.session.user.userId;
  try {
    const response = await removeCartModel({ productId, userId });
    if (response.success) {
      return res.send({
        status: 200,
        message: "Product successfully removed from cart",
        deletedProduct: response.deletedProduct,
      });
    } else {
      return res.send({
        status: 500,
        message: "Error in deleting product from cart",
        error: response.error,
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const removeAllCartController = async (req, res) => {
  try {
    const userId = req.session.user.userId;
    const response = await cartSchema.deleteMany({ userId });
    return res.send({
      status: 200,
      message: "All data deleted Successfully from cart",
      response,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await productSchema.find();
    return res.send({
      status: 200,
      message: "All Products are fetched",
      products: response,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error,
    });
  }
};

const getAdminProducts = async (req,res) => {
  const company = req.session.user.name;
  try {
    const products = await productSchema.find({company});
    return res.send({
      status:200,
      message:"All products of admin are fetched successfully",
      products,
    })
  } catch (error) {
    return res.send({
      status:500,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

const removeProduct = async (req,res) => {
  const {productId} = req.body;
  try {
    const deleted = await productSchema.findByIdAndDelete(productId);
    return res.send({
      status:200,
      message:"Product deleted successfully",
      deleted
    })
  } catch (error) {
    return res.send({
      status:500,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

module.exports = {
  addProductController,
  getFemaleProductsController,
  getMaleProductsController,
  getKidsProductsController,
  getAccessoriesProductsController,
  getMotherDaughterController,
  getMotherSonController,
  getFatherDaughterController,
  getFatherSonController,
  getCoupleController,
  getWishlistController,
  addWishListController,
  addCartController,
  getCartController,
  removeWishListController,
  removeCartController,
  getAllProducts,
  removeAllCartController,
  getAdminProducts,
  removeProduct
};
