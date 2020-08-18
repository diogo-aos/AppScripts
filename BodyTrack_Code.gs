function fastingSince() {
  
}


// find last row
function getFirstEmptyRow(start_row_i) {
  var row_i = start_row_i;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var column = spreadsheet.getRange('A2:A');
  var values = column.getValues(); // get all data in one call
  var ct = 0;
  while ( values[ct][0] != "" ) {
    ct++;
  }
  return (ct);
}

function getFirstEmptyRowForwardsLegacy(start_row_i){
  var row_i = start_row_i;
  var col_i = 1;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var max_rows = SpreadsheetApp.getActiveSheet().getMaxRows()
  var value = SpreadsheetApp.getActiveSheet().getRange(row_i, col_i).getValue();
  while ( value != "" && row_i < max_rows) {
    row_i++;
    value = SpreadsheetApp.getActiveSheet().getRange(row_i, col_i).getValue();
  }
  return row_i;
}


function getFirstEmptyRowForwards(start_row_i, sheet){
  var row_i = start_row_i;
  var col_i = 1;
  var max_rows = sheet.getMaxRows()
  var value = sheet.getRange(row_i, col_i).getValue();
  while ( value != "" && row_i < max_rows) {
    row_i++;
    value = sheet.getRange(row_i, col_i).getValue();
  }
  return row_i;
}

function getFirstEmptyRowBackwards(start_row_i){
  var row_i = start_row_i;
  var col_i = 1;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var value = SpreadsheetApp.getActiveSheet().getRange(row_i, col_i).getValue();
  while ( value != "" && row_i > 0) {
    row_i--;
    value = SpreadsheetApp.getActiveSheet().getRange(row_i, col_i).getValue();
  }
  return row_i;
}
