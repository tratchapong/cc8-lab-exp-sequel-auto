var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _departments = require("./departments");
var _employees = require("./employees");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _products = require("./products");
var _suppliers = require("./suppliers");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var suppliers = _suppliers(sequelize, DataTypes);

  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  orders.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(orders, { as: "orders", foreignKey: "employee_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_items, { as: "order_items", foreignKey: "product_id"});
  products.belongsTo(suppliers, { as: "supplier", foreignKey: "supplier_id"});
  suppliers.hasMany(products, { as: "products", foreignKey: "supplier_id"});

  return {
    customers,
    departments,
    employees,
    order_items,
    orders,
    products,
    suppliers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
