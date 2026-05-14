// src/core/database/db.js

class DB {
  constructor() {
    this.ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  table(name) {
    const sheet = this.ss.getSheetByName(name);

    if (!sheet) {
      throw new Error(`Sheet '${name}' does not exist`);
    }

    return new Table(sheet);
  }
}

class Table {
  constructor(sheet) {
    this.sheet = sheet;
  }

  // INSERT DATA
  insert(data) {
    const headers = this.sheet
      .getRange(1, 1, 1, this.sheet.getLastColumn())
      .getValues()[0];

    const row = headers.map(h => data[h] ?? "");

    this.sheet.appendRow(row);

    return {
      success: true,
      message: "Row inserted successfully",
      data
    };
  }

  // GET ALL RECORDS
  findAll() {
    const data = this.sheet.getDataRange().getValues();

    if (data.length < 2) return [];

    const headers = data[0];

    return data.slice(1).map(row => {
      let obj = {};

      headers.forEach((h, i) => {
        obj[h] = row[i];
      });

      return obj;
    });
  }

  // FILTER RECORDS
  where(column, value) {
    return this.findAll().filter(row => row[column] === value);
  }

  // UPDATE RECORD
  update(matchColumn, matchValue, newData) {
    const data = this.sheet.getDataRange().getValues();
    const headers = data[0];

    const matchIndex = headers.indexOf(matchColumn);

    if (matchIndex === -1) {
      throw new Error(`Column '${matchColumn}' not found`);
    }

    for (let i = 1; i < data.length; i++) {
      if (data[i][matchIndex] === matchValue) {

        headers.forEach((header, colIndex) => {

          if (newData[header] !== undefined) {
            this.sheet
              .getRange(i + 1, colIndex + 1)
              .setValue(newData[header]);
          }

        });

      }
    }

    return {
      success: true,
      message: "Row updated successfully"
    };
  }

  // DELETE RECORD
  delete(matchColumn, matchValue) {
    const data = this.sheet.getDataRange().getValues();
    const headers = data[0];

    const matchIndex = headers.indexOf(matchColumn);

    if (matchIndex === -1) {
      throw new Error(`Column '${matchColumn}' not found`);
    }

    for (let i = data.length - 1; i >= 1; i--) {

      if (data[i][matchIndex] === matchValue) {
        this.sheet.deleteRow(i + 1);
      }

    }

    return {
      success: true,
      message: "Row deleted successfully"
    };
  }
}

// GLOBAL INSTANCE
const DBInstance = new DB();