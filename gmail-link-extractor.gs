//Search GMail label for URLs in messages
//Return URLs list, pushes data to Google Sheet
function GetURLs ()
{
  //Get active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();  
 
  //Label to search
  // var userInputSheet = ss.getSheets()[0];
  //var labelName = userInputSheet.getRange("B2").getValue();
  var labelName = 'goddardpics' //add one here
 
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

        // find the URL
        var matches = messageBodyStore.match (regex);

        // find teacher notes
        var aindex = messageBodyStore.indexOf("</span></span>");
        var b = messageBodyStore.substring(0,aindex);
        var bindex = b.lastIndexOf(">");
        var teachernotes = b.substring(bindex+1,b.length)

        // // find the date
        // var idx = messageBodyStore.lastIndexOf(">DAILY REPORT -");
        // var picdate = messageBodyStore.substring(idx+14,idx+26);
        // console.log(idx);
        // console.log(picdate);
        // //var fullname = picdate.concat(" - " + teachernotes);


        if (matches)
        {
          for (var k = 0; k< matches.length; k++){
            //Get rid of irrelevnat URLs - relevant URLs have 'enail'
            if (matches[k].indexOf("enail") != -1 || matches[k].indexOf("thumbnail") != -1){
              //remove enail=true and thumbnail as it makes the photo smaller
              newurl = matches[k].replace("enail=true","")
              newurl = matches[k].replace("thumbnail=true","")
              
              // write results into the sheet
              //sheet.getRange (writeIndex++, 1).setValue (newurl);
              
              //save the file to drive
              getFile(newurl,teachernotes);
            }         
          }       
        }
      }
    }
  }
}

function getFile(fileURL,teacherName,picDate) {
 
  var response = UrlFetchApp.fetch(fileURL);
  var fileblob = response.getBlob();
  
  // if there is a teacher note - use it as the name for the file
  teacherName? name = teacherName  :  name = fileblob.getName();
  //picDate? name = name.concat(picDate):name;
  
  var folder = DriveApp.getFoldersByName('goddardpics').next();
 
  // make sure this file does not already exist
  if (folder.getFilesByName(name).hasNext() != true){
    folder.createFile(fileblob).setName(name);
  }
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