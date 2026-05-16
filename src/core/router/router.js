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

  Logger.log("DBInstance check: " + typeof DBInstance);

  const products = ProductService.getAll(payload.token);

  Logger.log("PRODUCTS RAW: " + JSON.stringify(products));

  return JSON.stringify({ success: true, data: products });

    case "ADD_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return DBInstance.table("products").insert(payload.data);

    case "CREATE_PRODUCT":
      requireRole(payload.token, "ADMIN");
      const productResult = ProductService.create(payload.token, payload.data);
      return JSON.stringify({ success: true, data: productResult });

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

    case "GET_UNITS":
      return JSON.stringify({
        success: true,
        data: UnitService.getAll(payload.token)
      });

    case "UPDATE_PRODUCT":
      requireRole(payload.token, "ADMIN");
      const updateResult = ProductService.update(payload.token, payload.data);
      return JSON.stringify({ success: true, data: updateResult });

    case "DELETE_PRODUCT":
      requireRole(payload.token, "ADMIN");
      return JSON.stringify({
        success: true,
        data: DBInstance.table("products").delete("id", payload.productId)
      });

    case "GET_CATEGORIES":
      return JSON.stringify({
        success: true,
        data: CategoryService.getAll(payload.token)
      });

    case "CREATE_CATEGORY":
      requireRole(payload.token, "ADMIN");
      const categoryResult = CategoryService.create(payload.token, payload.data);
      return JSON.stringify({ success: true, data: categoryResult });

    case "UPDATE_CATEGORY":
      requireRole(payload.token, "ADMIN");
      const updateCategoryResult = CategoryService.update(payload.token, payload.data);
      return JSON.stringify({ success: true, data: updateCategoryResult });

    case "DELETE_CATEGORY":
      requireRole(payload.token, "ADMIN");
      return JSON.stringify({
        success: true,
        data: CategoryService.delete(payload.token, payload.categoryId)
      });

    case "GET_STOCK_MOVEMENTS":
      return JSON.stringify({
        success: true,
        data: StockMovementService.getAll(payload.token, payload.filters || {})
      });

    case "GET_PRODUCT_STOCK_HISTORY":
      return JSON.stringify({
        success: true,
        data: StockMovementService.getStockHistory(payload.token, payload.productId)
      });

    case "RECORD_STOCK_MOVEMENT":
      requireRole(payload.token, "ADMIN");
      const movementResult = StockMovementService.record(payload.token, payload.data);
      return JSON.stringify({ success: true, data: movementResult });

    case "GET_STOCK_SUMMARY":
      return JSON.stringify({
        success: true,
        data: StockMovementService.getSummary(payload.token, payload.filters || {})
      });

    default:
      throw new Error("Unknown action");
  }
}
