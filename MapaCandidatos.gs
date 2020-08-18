function Export2PDF() {
  SpreadsheetApp.flush();
  
    //make pdf
      var theurl = 'https://docs.google.com/a/mydomain.org/spreadsheets/d/'
      + '1rYACvr1TxKwbiLU'  //the file ID
      + '/export?exportFormat=pdf&format=pdf'
      + '&size=LETTER'
      + '&portrait=true'
      + '&fitw=true'       
      + '&top_margin=0.50'              
      + '&bottom_margin=0.50'          
      + '&left_margin=0.50'             
      + '&right_margin=0.50'           
      + '&sheetnames=false&printtitle=false'
      + '&pagenum=false'
      + '&gridlines=false'
      + '&fzr=FALSE'      
      + '&gid='
      + '169036';       //the sheet's Id
  
  var fileId = '1dbjJHVEEC7-wPpGJ95rstnulzCu6Oq8oHEkBOBxqniE';
  var format = 'pdf';
  var size = 'A4';
  var portrait = 'true';
  
  var url = 'https://docs.google.com/spreadsheets/d/1dbjJHVEEC7-wPpGJ95rstnulzCu6Oq8oHEkBOBxqniE/export?exportFormat=pdf&format=pdf&size=A3&portrait=false'
  
  
  var params = {method:"GET",headers:{"authorization":"Bearer "+ ScriptApp.getOAuthToken()}};
  
  var response = UrlFetchApp.fetch(url, params).getBlob();
  // save to drive
  //DriveApp.createFile(response);
  
  //or send as email
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd_MM_yyyy");

  var email='dasilva@academiafa.edu.pt';
  
  var subject = 'Backup MapasCandidatos ' + date;
  var body = '';
    
  
  MailApp.sendEmail(email, subject, body, {
        attachments: [{
            fileName: "MapasCandidatos" + date + ".pdf",
            content: response.getBytes(),
            mimeType: "application/pdf"
        }]
    });
  
}



function _getAsBlob(url, sheet, range) {
  var rangeParam = ''
  var sheetParam = ''
  if (range) {
    rangeParam =
      '&r1=' + (range.getRow() - 1)
      + '&r2=' + range.getLastRow()
      + '&c1=' + (range.getColumn() - 1)
      + '&c2=' + range.getLastColumn()
  }
  if (sheet) {
    sheetParam = '&gid=' + sheet.getSheetId()
  }
  var exportUrl = url.replace(/\/edit.*$/, '')
      + '/export?exportFormat=pdf&format=pdf'
      + '&size=A4'
      + '&portrait=false'
      + '&fitw=true'       
      + '&top_margin=0.75'              
      + '&bottom_margin=0.75'          
      + '&left_margin=0.7'             
      + '&right_margin=0.7'           
      + '&sheetnames=false&printtitle=false'
      + '&pagenum=false'
      + '&gridlines=true'
      + '&fzr=FALSE'      
      + sheetParam
      + rangeParam
      
  Logger.log('exportUrl=' + exportUrl)
  var response = UrlFetchApp.fetch(exportUrl, {
    headers: { 
      Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
    },
  })
  
  return response.getBlob()
}

function printOutDaily(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var printSheet = spreadsheet.getSheetByName('ImprimirDiario');
  var blob = _getAsBlob(spreadsheet.getUrl(), printSheet);
  //or send as email
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd_MM_yyyy");

  var email='dasilva@academiafa.edu.pt,dasilva@emfa.pt';
  var subject = 'Mapa Candidatos Diario ' + date;
  var body = '';
  
    MailApp.sendEmail(email, subject, body, {
        attachments: [{
            fileName: "Mapa Candidatos Diario Impresso " + date + ".pdf",
            content: blob.getBytes(),
            mimeType: "application/pdf"
        }]
    });
}

function printOutESV(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var printSheet = spreadsheet.getSheetByName('ImprimirESV');
  var blob = _getAsBlob(spreadsheet.getUrl(), printSheet);
  //or send as email
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd_MM_yyyy");

  var email='dasilva@academiafa.edu.pt,dasilva@emfa.pt';
  var subject = 'Mapa Candidatos ESV ' + date;
  var body = '';
  
    MailApp.sendEmail(email, subject, body, {
        attachments: [{
            fileName: "Mapa Candidatos ESV " + date + ".pdf",
            content: blob.getBytes(),
            mimeType: "application/pdf"
        }]
    });
}
