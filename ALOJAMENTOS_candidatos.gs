function quartos_vazios() {
  var spreadsheet = SpreadsheetApp.getActive();
  // load saved first empty row from "settings"
  var reservasSheet = spreadsheet.getSheetByName("RevervasQuartosCalendario"); //.getRange(range).getValue();
  var data = reservasSheet.getRange('A1:BK422');
  data.values;
  Logger.log(data.value);
  var row, col;
  for (row=0; row<100; row++);
    //Logger.log(data[row][1]);
}

function logNamesAndMajors() {
  var spreadsheetId = '1PkCbHPZL15isUy1t98_Smya07fXlJZqwgsQjtw8a5aA';
  var rangeName = 'RevervasQuartosCalendario!A1:BK422';
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('Name, Major:');
    for (var row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      Logger.log(' - %s, %s', values[row][0], values[row][4]);
    }
  }
}

function removeMenu(){
    var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.removeMenu('getValues');
}

function onOpen() 
{
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Candidatos2020')
      .addItem('Quartos Livres', 'QuartosLivresEmPeriodo')
      .addToUi();
}

function QuartosLivresEmData(){
  var spreadsheet = SpreadsheetApp.getActive();
  var reservasSheet = spreadsheet.getSheetByName('RevervasQuartosCalendario');
  var outputsSheet = spreadsheet.getSheetByName('Outputs');
 
  var searchDate = outputsSheet.getRange(1, 2).getValue();
  searchDate = Utilities.formatDate(searchDate, "GMT+1", "dd_MM_yyyy");
  
  // PROCURAR COLUNA COM DATA CERTA
  // data na linha 1, a partir da coluna 2
  var dateColumn = null;
  for (var col=3; col<=reservasSheet.getMaxColumns(); col++){
    // check for correct date
    var col_date = Utilities.formatDate(reservasSheet.getRange(2, col).getValue(), "GMT+1", "dd_MM_yyyy")
    Logger.log(col_date);
    if (searchDate == col_date){
      dateColumn = col;
      break;
    }
  }
  
  
  // LISTAR QUARTOS LIVRES
  // 2 linhas por quarto a começar na linha 3
  var quartos_livres = [];

  var date_column = reservasSheet.getRange(3, dateColumn, reservasSheet.getMaxRows()-3+1, 1).getValues();
  var rooms_column = reservasSheet.getRange(3, 1, reservasSheet.getMaxRows()-3+1, 1).getValues();
  Logger.log(rooms_column);
  
  for (var i=0; i<date_column.length; i+=2){
    if (date_column[i][0] === "" && date_column[i+1][0] === "")
      quartos_livres.push(rooms_column[i][0]);
  }
  
  var y = quartos_livres.length;
  var output_row = 3;
  for(var i=0; i<quartos_livres.length; i++){
    outputsSheet.getRange(output_row, 1).setValue(quartos_livres[i]);
    output_row++;
    Logger.log('room free:' + quartos_livres[i]);
  }
  
  /*
  
  var output_row = 3;
  for (var row=3; col<=reservasSheet.getMaxRows(); row+=2){
    var bed1 = reservasSheet.getRange(row, dateColumn);
    var bed2 = reservasSheet.getRange(row+1, dateColumn);
    if (bed1.isBlank() && bed2.isBlank()){
      var room = reservasSheet.getRange(row, 1).getValue();
      quartos_livres.push(room);
      outputsSheet.getRange(output_row, 1).setValue(room);
      output_row++;
    }
  }

  Logger.log(quartos_livres);

  */
  
  
  
  /*
  var date_column = reservasSheet.getRange(3, dateColumn, reservasSheet.getMaxRows()-3+1, 1).getValues()[0];
  var rooms_column = reservasSheet.getRange(3, 1, reservasSheet.getMaxRows()-3+1, 1).getValues()[0];
  
  for (var i=0; i<date_column.length; i+=2){
    if (date_column[i][0] === "" && date_column[i+1][0] === "")
      quartos_livres.push(rooms_column[i][0]);
  }
 
  
  */
  
  } // end of function



function QuartosLivresEmPeriodo(){
  var spreadsheet = SpreadsheetApp.getActive();
  var reservasSheet = spreadsheet.getSheetByName('RevervasQuartosCalendario');
  var outputsSheet = spreadsheet.getSheetByName('Outputs');
  
  // limpar output
  outputsSheet.getRange(4, 1, 1000,3).clear();
 
  var searchDate_start = outputsSheet.getRange(1, 2).getValue();
  searchDate_start = Utilities.formatDate(searchDate_start, "GMT+1", "dd_MM_yyyy");
  var searchDate_end = outputsSheet.getRange(2, 2).getValue();
  searchDate_end = Utilities.formatDate(searchDate_end, "GMT+1", "dd_MM_yyyy");
  
  // PROCURAR COLUNA COM DATA DE INICIO E FIM
  // data na linha 1, a partir da coluna 2
  var dateColumn_start = null;
  var dateColumn_end = null;
  for (var col=3; col<=reservasSheet.getMaxColumns(); col++){
    // check for correct date
    var col_date = Utilities.formatDate(reservasSheet.getRange(2, col).getValue(), "GMT+1", "dd_MM_yyyy")
    if (searchDate_start == col_date){
      dateColumn_start = col;
    }
    if (searchDate_end == col_date){
      dateColumn_end = col;
    }
  }
  
  
  // LISTAR QUARTOS LIVRES
  // 2 linhas por quarto a começar na linha 3
  var quartos_ocupacao = [];

  var reserves_array = reservasSheet.getRange(3, dateColumn_start, reservasSheet.getMaxRows()-3+1, dateColumn_end-dateColumn_start+1).getValues();
  var rooms_column = reservasSheet.getRange(3, 1, reservasSheet.getMaxRows()-3+1, 1).getValues();
  Logger.log(rooms_column);
  Logger.log(reserves_array.length);
  Logger.log(reserves_array[0].length);
  
  for (var i=0; i<reserves_array.length/2; i++){ // 1 room occupies 2 rows
    quartos_ocupacao[i] = [rooms_column[i*2][0],0];
    // verificar cama 1
    for(var j=0; j<reserves_array[0].length; j++){
      if (reserves_array[i*2][j] !== ""){
        quartos_ocupacao[i][1]++;
        break;
      }
    }
    // verificar cama 2
    for(var j=0; j<reserves_array[0].length; j++){
      if (reserves_array[i*2+1][j] !== ""){
        quartos_ocupacao[i][1]++;
        break;
      }
    }
  }
  Logger.log(quartos_ocupacao);
  var cama_livre_output_row = 4;
  var quarto_livre_output_row = 4;
  var z = quartos_ocupacao.length;
  for(var i=0; i<quartos_ocupacao.length; i++){
    Logger.log('room ' + quartos_ocupacao[i][0] + 'beds occupied: ' + quartos_ocupacao[i][1]);
    // cama livre  ==1
    if (quartos_ocupacao[i][1] == 1){
      outputsSheet.getRange(cama_livre_output_row, 3).setValue(quartos_ocupacao[i]);
      cama_livre_output_row++;
    }
    // cama livre  ==0
    if (quartos_ocupacao[i][1] == 0){
      outputsSheet.getRange(quarto_livre_output_row, 1).setValue(quartos_ocupacao[i]);
      quarto_livre_output_row++;
    }
  }
  
  var ui = SpreadsheetApp.getUi();
  ui.alert('Calculo de quartos livres no período entre ' + searchDate_start + ' e ' + searchDate_end + ' terminado.')
  

  
  } // end of function
