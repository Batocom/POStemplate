const StockMovementService = {

  MOVEMENT_TYPES: {
    SALE: 'SALE',
    PURCHASE: 'PURCHASE',
    ADJUSTMENT: 'ADJUSTMENT',
    RETURN: 'RETURN',
    DAMAGE: 'DAMAGE',
    TRANSFER: 'TRANSFER',
    MANUAL_IN: 'MANUAL_IN',
    MANUAL_OUT: 'MANUAL_OUT'
  },

  getAll(token, filters = {}) {
    requireAuth(token);
    let movements = DBInstance.table("stock_movements").findAll();

    if (filters.product_id) {
      movements = movements.filter(m => m.product_id === filters.product_id);
    }
    if (filters.type) {
      movements = movements.filter(m => m.type === filters.type);
    }
    if (filters.start_date) {
      const start = new Date(filters.start_date);
      movements = movements.filter(m => new Date(m.created_at) >= start);
    }
    if (filters.end_date) {
      const end = new Date(filters.end_date);
      movements = movements.filter(m => new Date(m.created_at) <= end);
    }

    return movements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  getByProduct(token, productId) {
    requireAuth(token);
    return this.getAll(token, { product_id: productId });
  },

  record(token, data) {
    requireRole(token, "ADMIN");
    StockMovementValidator.validateNewMovement(data);

    return DBInstance.table("stock_movements").insert({
      id: Utilities.getUuid(),
      product_id: data.product_id,
      type: data.type,
      quantity: data.quantity,
      reference_id: data.reference_id || "",
      notes: data.notes || "",
      created_at: new Date()
    });
  },

  getStockHistory(token, productId) {
    requireAuth(token);
    const movements = this.getByProduct(token, productId);
    let runningBalance = 0;

    return movements.map(m => {
      const qty = Number(m.quantity);
      if (['SALE', 'DAMAGE', 'MANUAL_OUT'].includes(m.type)) {
        runningBalance -= qty;
      } else {
        runningBalance += qty;
      }
      return {
        ...m,
        runningBalance
      };
    });
  },

  getSummary(token, filters = {}) {
    requireAuth(token);
    const movements = this.getAll(token, filters);

    const summary = {
      totalIn: 0,
      totalOut: 0,
      byType: {}
    };

    movements.forEach(m => {
      const qty = Number(m.quantity);
      if (['SALE', 'DAMAGE', 'MANUAL_OUT'].includes(m.type)) {
        summary.totalOut += qty;
      } else {
        summary.totalIn += qty;
      }

      if (!summary.byType[m.type]) {
        summary.byType[m.type] = 0;
      }
      summary.byType[m.type] += qty;
    });

    return summary;
  }
};
