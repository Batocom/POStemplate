function testProductModule() {

  const token = login("admin@local.app", "admin123").token;

  // 1. CREATE UNIT
  const unit = UnitService.create(token, {
    name: "Kilogram",
    symbol: "kg"
  });

  // 2. CREATE PRODUCT
  const product = ProductService.create(token, {
    name: "Sugar",
    sell_price: 120,
    stock: 10,
    unit_id: unit.data.id
  });

  Logger.log("PRODUCT CREATED:");
  Logger.log(product);

  // 3. STOCK IN
  StockService.increase(product.data.id, 5, "TEST");

  // 4. STOCK OUT
  StockService.decrease(product.data.id, 2, "TEST");

  // 5. VERIFY
  const products = ProductService.getAll(token);

  Logger.log(products);
}

function testFetchProducts() {
  const token = login("admin@local.app", "admin123").token;
  
  Logger.log("TOKEN: " + token);
  
  try {
    const products = ProductService.getAll(token);
    Logger.log("PRODUCTS COUNT: " + (products ? products.length : 0));
    Logger.log("PRODUCTS DATA: " + JSON.stringify(products));
  } catch (e) {
    Logger.log("ERROR: " + e.message);
  }
}
