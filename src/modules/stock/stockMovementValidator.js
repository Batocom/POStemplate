const StockMovementValidator = {

  validateNewMovement(data) {
    if (!data.product_id) throw new Error("Product ID is required");
    if (!data.type) throw new Error("Movement type is required");
    if (!data.quantity || Number(data.quantity) <= 0) throw new Error("Quantity must be greater than 0");

    const validTypes = ['SALE', 'PURCHASE', 'ADJUSTMENT', 'RETURN', 'DAMAGE', 'TRANSFER', 'MANUAL_IN', 'MANUAL_OUT'];
    if (!validTypes.includes(data.type)) {
      throw new Error("Invalid movement type: " + data.type);
    }

    return true;
  }
};
