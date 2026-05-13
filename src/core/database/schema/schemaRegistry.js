const { getUsersSchema } = require('./users.schema');
const { getProductsSchema } = require('./products.schema');
const { getSalesSchema } = require('./sales.schema');
const { getSaleItemsSchema } = require('./sale_items.schema');
const { getStockMovementsSchema } = require('./stock_movements.schema');

const SchemaRegistry = [
  getUsersSchema(),
  getProductsSchema(),
  getSalesSchema(),
  getSaleItemsSchema(),
  getStockMovementsSchema()
];
