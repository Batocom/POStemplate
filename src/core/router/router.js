function handleRequest(action, payload) {
  Logger.log("handleRequest called with action: " + action);
  const token = payload.token;

  // Allow LOGIN without authentication
  if (action === "LOGIN") {
    return login(payload.email, payload.password);
  }

  // All other actions require authentication
  if (!token) {
    throw new Error("Unauthorized");
  }

  requireAuth(token);

  switch(action) {

    case "GET_PRODUCTS":
      Logger.log("GET_PRODUCTS called with token: " + payload.token);
      const products = ProductService.getAll(payload.token);
      Logger.log("GET_PRODUCTS result count: " + (products ? products.length : 0));
      return products;

    case "ADD_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return DBInstance.table("products").insert(payload.data);

    case "CREATE_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return ProductService.create(payload.token, payload.data);

    case "STOCK_IN":
      requireRole(payload.token, "ADMIN");
      return StockService.increase(
        payload.productId,
        payload.qty,
        payload.referenceId
      );

    case "STOCK_OUT":
      requireAuth(payload.token);
      return StockService.decrease(
        payload.productId,
        payload.qty,
        payload.referenceId
      );

    case "CREATE_SALE":
      return SalesService.createSale(
        payload.token,
        payload
      );

    case "PRINT_RECEIPT":
      return ReceiptService.generate(
        payload.saleId
      );

    default:
      throw new Error("Unknown action");
  }
}
