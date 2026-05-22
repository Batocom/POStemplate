function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function setupSystem() {
  runMigrations();
  runSeeders();
  Logger.log("System setup complete");
}

function setupAuthTest() {
  const result = login("admin@local.app", "admin123");
  Logger.log(result);
}

function doGet() {
  return HtmlService
    .createTemplateFromFile('ui/app/index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1') // Fixes the zoomed-out layout on phones
    .setTitle('POS System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function setupSystem() {
  runMigrations();
  runSeeders();
  Logger.log("System setup complete");
}

function setupAuthTest() {
  const result = login("admin@local.app", "admin123");
  Logger.log(result);
}

function doGet() {
  return HtmlService
    .createTemplateFromFile('ui/app/index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1') // Fixes the zoomed-out layout on phones
    .setTitle('POS System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}