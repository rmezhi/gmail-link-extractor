//Search GMail label for URLs in messages
//Return URLs list, pushes data to Google Sheet
function GetURLs ()
{
  //Get active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();  
 
  //Label to search
  // var userInputSheet = ss.getSheets()[0];
  //var labelName = userInputSheet.getRange("B2").getValue();
  var labelName = '' //add one here
 
  //Create, empty target sheet
  var sheetName = "Label: " + labelName;
  var sheet = ss.getSheetByName (sheetName) || ss.insertSheet (sheetName, ss.getSheets().length);
  sheet.clear();
 
  //Get all messages in nested array (threads -> messages)

  var writeIndex = 1; // used to track last row written

  var startIndex = 0;
  var pageSize = 100;

  while (1)
  {
    //Search in pages of pageSize
    var threads = GmailApp.search ("label:" + labelName, startIndex, pageSize);

    if (threads.length == 0)
      break;
    else
      startIndex += pageSize;
 
    //Get all messages for current threads batch
    var messages = GmailApp.getMessagesForThreads (threads);
 
    //Loop over all messages
    for (var i = 0; i < messages.length ; i++)
    {
      //Loop over all messages in thread
      for (var j = 0; j < messages[i].length; j++)
      {
		var messageBodyStore = messages[i][j].getBody ();
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        var matches = messageBodyStore.match (regex);

        if (matches)
        {
          for (var k = 0; k< matches.length; k++){
            sheet.getRange (writeIndex++, 1).setValue (matches[k]);
          }       
        }
      }
    }
  }
 
  //Add data to sheet LEGACY
  // matches.forEach (url =>  )
  //sheet.getRange (1, 1,messageData.length,1).setValues (messageData);  
  //sheet.setValues (messageData);
  //SpreadsheetApp.getActiveSpreadsheet().getRange(range).setValues(messageData);
}
 
//Add sheet menu item for Extract script call
function onOpen ()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet ();
 
  var menu = [ 
    {name: "Extract URLs",functionName: "GetURLs"}
  ];  
 
  sheet.addMenu ("Get Links", menu);    
}
