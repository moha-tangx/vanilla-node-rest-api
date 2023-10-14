const products = require("../data.json");
const { writeToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id == id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = {
      id: Math.round(Math.random() * 10000000 + "" + products.length + 1),
      ...product,
    };
    products.push(newProduct);
    writeToFile("./data.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id == id);
    products[index] = { id, ...product };
    writeToFile("./data.json", products);
    resolve(products[index]);
  });
}
function remove(id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id == id);
    products.splice(index, 1);
    writeToFile("./data.json", products);
    resolve(products[index]);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
