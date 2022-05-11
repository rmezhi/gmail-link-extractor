# gmail-link-extractor

## Summary
Find emails with a label, extact links from them ~~into a spreadsheet~~ and write the images to Drive

This is really useful when a Daycare providers like Bright Horizons and others (using Tadpoles engine)  send emails /w kido pictures - but there is no non-manual way to get all the photos!

This script solves that by automating the extraction from email and saving the images to Drive

---

## Files

Main file is `gmail-link-extractor.gs`

The rest in `utils/` are some specific scripts I used to process the links and might not be relenvat to you ```:D```

## Install
- Open new gsheet
- Go to `extensions -> Apps Script`
- Paste the `.gs` file into the editor and save 
- Some Google\Gmail Auth will likly popup when you run it for the firs time. This does not require any special permissions, just need to be able to read your emails
- Set a time trigger to run this script daily
- Create a Google Drive folder called 'goddardpics' - or change that in the code....

Another option is to run the `onOpen` method to add a gsheet menu item - totally optional - you can just run the script from Appscript directly

## Configure
- The script will look first for emails with a certain label
- This is determined by the ```var labelName```
- There is also some code above it if you wanted to read the label from the sheet itself
- Other things to configure: `startIndex` and `pageSize` depending on the number of emails you want to scan and where you want to start

## Operation
* The script scans emails with given Label from gmail
* For each email it matches links using a regex and 
* ~~It creates a sheet with the label name~~
* ~~Popules 1 row for each link found~~
* Extracts the teachers notes - if available 
* Formats the proper Image URL
* Fetches the image and writes it to Drive under a folder called 'goddardpics' - giving it the name from Teacher notes

*Note: that it will overrite your sheet if one is already found

---
Based on the work of @joshpadilla

