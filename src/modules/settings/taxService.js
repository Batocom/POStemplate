const TaxService = {
  
  /**
   * Default tax rate (8%)
   * Can be overridden by settings in the database
   */
  DEFAULT_TAX_RATE: 8,
  
  /**
   * Get the current tax rate
   * Checks for a tax setting in the database, falls back to default
   */
  getTaxRate() {
    try {
      // Check if settings table exists and has a tax rate
      const settingsTable = DBInstance.table("settings");
      const taxSetting = settingsTable.where("key", "tax_rate");
      
      if (taxSetting.length > 0 && taxSetting[0].value) {
        const rate = Number(taxSetting[0].value);
        if (!isNaN(rate) && rate >= 0) {
          return rate;
        }
      }
    } catch (e) {
      // Settings table may not exist yet, use default
      console.error("Failed to get tax rate from settings:", e);
    }
    
    return this.DEFAULT_TAX_RATE;
  },
  
  /**
   * Set the tax rate
   * @param {string} token - Auth token
   * @param {number} rate - Tax rate percentage (e.g., 8 for 8%)
   */
  setTaxRate(token, rate) {
    requireRole(token, "ADMIN");
    
    if (isNaN(rate) || rate < 0) {
      throw new Error("Invalid tax rate");
    }
    
    const settingsTable = DBInstance.table("settings");
    const existing = settingsTable.where("key", "tax_rate");
    
    if (existing.length > 0) {
      settingsTable.update("key", "tax_rate", { value: String(rate) });
    } else {
      settingsTable.insert({
        id: Utilities.getUuid(),
        key: "tax_rate",
        value: String(rate),
        created_at: new Date()
      });
    }
    
    return { success: true, taxRate: rate };
  },
  
  /**
   * Calculate tax for a given amount
   * @param {number} amount - The amount to calculate tax on
   * @returns {number} The tax amount
   */
  calculateTax(amount) {
    const rate = this.getTaxRate();
    return (amount * rate) / 100;
  },
  
  /**
   * Get tax info for display
   * @returns {Object} { rate, label }
   */
  getTaxInfo() {
    const rate = this.getTaxRate();
    return {
      rate: rate,
      label: "Tax (" + rate + "%)"
    };
  }
};
