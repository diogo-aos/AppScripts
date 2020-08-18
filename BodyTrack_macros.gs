function globalVariables(){
  var variables = {
    settingsSheet: 'settings',
    foodlogSheet: 'foodlog',
    todaySheet: 'today',
    sleepSheet: 'sleep',
    fitnessSheet: 'fitness',
    weightSheet: 'weight',
    healthSheet: 'health',
    
    settings_foodlog_firstEmptyRow: "B1",
    settings_sleep_firstEmptyRow: "B3",
    settings_fitness_firstEmptyRow: "B4",
    settings_weight_firstEmptyRow: "B5",
    settings_health_firstEmptyRow: "B6"
  };
  return variables;
}

function settings_getVal(range){
    var spreadsheet = SpreadsheetApp.getActive();
  // load saved first empty row from "settings"
  var val = spreadsheet.getSheetByName(globalVariables().settingsSheet).getRange(range).getValue();
  return val;
}

function settings_setVal(range, new_val){
    var spreadsheet = SpreadsheetApp.getActive();
  // load saved first empty row from "settings"
  spreadsheet.getSheetByName(globalVariables().settingsSheet).getRange(range).setValue(new_val);
  return new_val;
}



function archive2() {
  // this function copies data from sheet "today",
  // pastes it to the end of sheet "foodlog"
  // and finally clears the data in sheet "today"
  
  var spreadsheet = SpreadsheetApp.getActive();
  var foodlog_sheet = spreadsheet.getSheetByName(globalVariables().foodlogSheet);
  var today_sheet = spreadsheet.getSheetByName(globalVariables().todaySheet);
  var foodlog_firstEmptyRowSettingsRange = globalVariables()['settings_' + 'foodlog' + '_firstEmptyRow']

  // load saved first empty row from "settings"
  var row = settings_getVal(foodlog_firstEmptyRowSettingsRange);
  
  
  // check if there is enough space, if not add 300 rows to the end
  var max_rows = foodlog_sheet.getMaxRows();
  if ((max_rows) - row < 300) {
    foodlog_sheet.insertRowsAfter(max_rows-1, 300);
  }
  
  
  // copy form "today" and paste data in "foodlog" in activated cell (first empty row)
  today_sheet.getRange('A2:L525').copyTo(foodlog_sheet.getRange('A'+ row.toString()), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  
  // find and save new first empty row
  row = getFirstEmptyRowForwards(row, foodlog_sheet);
  settings_setVal(foodlog_firstEmptyRowSettingsRange, row);
  
  //clear data
  today_sheet.getRange('O2:V2').clear({contentsOnly: true, skipFilteredRows: true});
  today_sheet.getRange('L3:V2033').clear({contentsOnly: true, skipFilteredRows: true});
};

function sheet_end(name){
  var spreadsheet = SpreadsheetApp.getActive();
  var sheetName = globalVariables()[name+"Sheet"];
   Logger.log(globalVariables());
  Logger.log(sheetName);
  var firstEmtpyRowSettingRange = globalVariables()['settings_' + name + '_firstEmptyRow']
  var sheet = spreadsheet.getSheetByName(sheetName);
  var row = settings_getVal(firstEmtpyRowSettingRange);
  row = getFirstEmptyRowForwards(row, sheet);
  sheet.getRange(row, 1).activate();
  settings_setVal(firstEmtpyRowSettingRange, row);
}

function foodlog_end() {
  sheet_end('foodlog'); 
};

function health_end(){
 sheet_end('health'); 
}

function sleep_end(){
 sheet_end('sleep'); 
}

function fitness_end(){
 sheet_end('fitness'); 
}

function weight_end(){
 sheet_end('weight'); 
}
