const Products = require("../models/productModel");
const { create, remove, update } = require("../models/productModel");
const { getPostData } = require("../utils");

//  gets all products

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();
    res.writeHead(200, { "content-Type": "text/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// gets a single product

async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(404, { "content-Type": "text/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "content-Type": "text/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}
// creates a single product
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { tittle, description, price } = JSON.parse(body);
    const product = {
      tittle,
      description,
      price,
    };
    const newProduct = await create(product);
    res.writeHead(201, { "content-Type": "text/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}
// updates the selected product
async function updateProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "content-Type": "text/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      const body = await getPostData(req);
      const { tittle, description, price } = JSON.parse(body);
      const productData = {
        tittle: tittle || product.tittle,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await update(id, productData);
      res.writeHead(200, { "content-Type": "text/json" });
      res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// delete product
async function deleteProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "content-Type": "text/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      await remove(id);
      res.end(JSON.stringify({ message: "product deleted" }));
      res.writeHead(200, { "content-Type": "text/json" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
