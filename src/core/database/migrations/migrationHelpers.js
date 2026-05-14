function createSheetIfNotExists(sheetName) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  return sheet;
}
function setSheetHeaders(sheet, headers) {

  const existingHeaders = sheet
    .getRange(1, 1, 1, sheet.getLastColumn() || 1)
    .getValues()[0];

  // PREVENT OVERWRITING EXISTING HEADERS
  if (existingHeaders[0] !== "") return;

  sheet
    .getRange(1, 1, 1, headers.length)
    .setValues([headers]);

  // OPTIONAL STYLING
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold");
}