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
    .setTitle('POS System')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

}