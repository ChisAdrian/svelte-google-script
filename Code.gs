function doGet(e) {
  return HtmlService.createTemplateFromFile('index.html')
    .evaluate().setTitle('Title')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
}

function googlescr_fetchData_Input(some_input) {
  var spreadsheet = SpreadsheetApp.getActive();
  var ssConstants = spreadsheet.getSheetByName(some_input)
  if (ssConstants === null) {
    return false;
  }

  let data  = ssConstants.getRange("A1:B5").getDisplayValues();
  return JSON.stringify(data);
}
