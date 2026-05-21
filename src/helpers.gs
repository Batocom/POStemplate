/**
 * Include a file from the project
 * @param {string} filename - Path to the file (e.g., 'styles/base/reset.html')
 * @returns {string} The file content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
