const cartSchema = require("../schemas/cartSchema");
const productSchema = require("../schemas/productSchema");
const wishListSchema = require("../schemas/wishListSchema");

const addProductModel = async (productData) => {
  try {
    const newProduct = new productSchema(productData);
    const savedProduct = await newProduct.save();
    return { success: true, product: savedProduct };
  } catch (error) {
    return { success: false, error };
  }
};

const getFemaleProductsModel = async () => {
  try {
    const response = await productSchema.find({ category: "female" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getMaleProductsModel = async () => {
  try {
    const response = await productSchema.find({ category: "male" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getKidsProductsModel = async () => {
  try {
    const response = await productSchema.find({ category: "kid" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getAccessoriesProductsModel = async () => {
  try {
    const response = await productSchema.find({ category: "accessories" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getMotherDaughterModel = async () => {
  try {
    const response = await productSchema.find({ combo: "mother-daughter" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getMotherSonModel = async () => {
  try {
    const response = await productSchema.find({ combo: "mother-son" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getFatherDaughterModel = async () => {
  try {
    const response = await productSchema.find({ combo: "father-daughter" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getFatherSonModel = async () => {
  try {
    const response = await productSchema.find({ combo: "father-son" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getCoupleModel = async () => {
  try {
    const response = await productSchema.find({ combo: "couple" });
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getWishlistModel = async (userId) => {
  try {
    const response = await wishListSchema
      .find({ userId })
      .populate("userId")
      .populate("productId");
    if (!response || response.length === 0) {
      return { success: false, message: "No Product Found in Wishlist" };
    }
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const getCartModel = async (userId) => {
  try {
    const response = await cartSchema
      .find({ userId })
      .populate("userId")
      .populate("productId");
    if (!response || response.length === 0) {
      return { success: false, message: "No Product Found in Cart" };
    }
    return { success: true, products: response };
  } catch (error) {
    return { success: false, error };
  }
};

const removeCartModel = async ({productId,userId}) => {
  try {
    const response = await cartSchema.findOneAndDelete({productId,userId});
    return {success:true,deletedProduct:response}
  } catch (error) {
    return {success:false,error};
  }
}

const removeWishlistModel = async ({productId,userId}) => {
  try {
    const response = await wishListSchema.findOneAndDelete({productId,userId});
    return {success:true,deletedProduct:response}
  } catch (error) {
    return {success:false,error};
  }
}

module.exports = {
  addProductModel,
  getFemaleProductsModel,
  getMaleProductsModel,
  getKidsProductsModel,
  getAccessoriesProductsModel,
  getMotherDaughterModel,
  getMotherSonModel,
  getFatherDaughterModel,
  getFatherSonModel,
  getCoupleModel,
  getWishlistModel,
  getCartModel,
  removeCartModel,
  removeWishlistModel
};
