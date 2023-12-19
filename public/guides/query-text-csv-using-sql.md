## Querying Text or CSV files using SQL Syntax

### Background

Reading text files using the built in `CSV/TEXT` action has certain limitations,
especially when it comes to reading larger datasets.

- The data once opened is in the same order and format as it is read by the action
    - _Unordered data can lead to inefficient main loops_

Use the [Connect action](https://docs.automationanywhere.com/bundle/enterprise-v2019/page/enterprise-cloud/topics/aae-client/bot-creator/commands/cloud-using-database-connect-action.html) to establish a connection with the database server
that you want to use to automate database-related tasks.
This action supports Microsoft Access, Microsoft SQL Server, MySQL, Oracle,
PostgreSQL Server and SQLite database servers, as well as the use of CSV,
Microsoft Excel, and TXT files as databases.

### Prerequisites and Installation

1. Installation of 32-bit ODBC Drivers
2. Installation of 64-bit ODBC Drivers

These drivers are also installed when you install microsoft office.
I have read that they come with windows since Windows 7, however the Enterprise
VMs we use were missing these drivers.
Installing MS Office 2016 also installed these drivers.

### Connection Strings

First off, this extremely useful resource ([connectionstrings.com](https://www.connectionstrings.com/net-framework-data-provider-for-odbc/)) is where most of the below information is sourced.

It's important to note, if you check the **Use 64-bit** checkbox in the `Database Connect` action,
you will need to use in your connection string, the exact name shown in the ODBC 64-bit driver window.

**32-bit**

`Driver={Microsoft Text Driver (*.txt; *.csv)};Dbq=c:\txtFilesFolder\;Extensions=asc,csv,tab,txt;`

**64-bit**

`Driver=Microsoft Access Text Driver (*.txt, *.csv);Dbq=c:\txtFilesFolder\; Extensions=asc,csv,tab,txt;`

### Usage

1. Drag the `Database Connect` action to your workspace
2. Set the connection string
3. Name your session
4. Drag the `Database Read From` action to your workspace
5. Update the session id to the same as step 3
6. Write your SQL query to retrieve the data in the required format
7. Drag the `Loop` action to your workspace
8. Select For each row in database query
9. Write your SQL, for the table, use the file name ```sql select * from [test_file.csv]```
10. Choose how you want to store the variable, either multiple variables or a Record variable

```aacode
{"triggers":[],"nodes":[{"uid":"8e61f850-34ad-4ca2-b583-a819d7d685c8","commandName":"step","packageName":"Step","disabled":false,"children":[{"uid":"57033ff3-9439-4858-9bc0-537ecad77256","commandName":"assign","packageName":"String","disabled":false,"attributes":[{"name":"sourceString","value":{"type":"STRING","string":"C:\\Temp\\spreadsheet.xlsx"}}],"returnTo":{"type":"VARIABLE","variableName":"sExcelFilePath"}},{"uid":"5ad5aa2b-c3ad-48c7-ac9e-029d7e8f781b","commandName":"connect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default"}},{"name":"connectionMode","value":{"type":"STRING","string":"DEFAULT"}},{"name":"connectionOption","value":{"type":"STRING","string":"text"}},{"name":"connectionURL","value":{"type":"STRING","expression":"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=$sExcelFilePath$;Extended Properties=\"Excel 12.0 Xml;HDR=YES\";"}},{"name":"use64BitDriver","value":{"type":"BOOLEAN","boolean":false}},{"name":"isUserDefinedDriver","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"c37b9684-1ff1-4865-9d3b-167a3d80aaa3","commandName":"disconnect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default"}},{"name":"dosaveData","value":{"type":"BOOLEAN","boolean":true}}]}],"attributes":[{"name":"title","value":{"type":"STRING","string":"Connect to excel using database driver (Read Only)"}}]},{"uid":"8550a660-4d75-4fae-9345-ab20d139b5c1","commandName":"step","packageName":"Step","disabled":false,"children":[{"uid":"3e95e209-2b9c-4134-934a-c38a7780c127","commandName":"connect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default"}},{"name":"connectionMode","value":{"type":"STRING","string":"DEFAULT"}},{"name":"connectionOption","value":{"type":"STRING","string":"text"}},{"name":"connectionURL","value":{"type":"STRING","expression":"Provider=SQLOLEDB.1;Integrated Security=SSPI;PersistSecurity Info=False;Initial Catalog=$@gDbName$;Data Source=$@gDbServerName$"}},{"name":"use64BitDriver","value":{"type":"BOOLEAN","boolean":false}},{"name":"isUserDefinedDriver","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"52148fe5-94af-494e-8360-701410421089","commandName":"disconnect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default"}},{"name":"dosaveData","value":{"type":"BOOLEAN","boolean":true}}]}],"attributes":[{"name":"title","value":{"type":"STRING","string":"Connect to SQLDB using database driver (Read Only) (Local Windows User Authentication Kerberos)"}}]},{"uid":"ee0a430c-ec85-48b4-a897-2ec5a1d66624","commandName":"step","packageName":"Step","disabled":false,"children":[{"uid":"a87739cd-3951-4690-aa4a-b831854018b0","commandName":"connect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default64"}},{"name":"connectionMode","value":{"type":"STRING","string":"DEFAULT"}},{"name":"connectionOption","value":{"type":"STRING","string":"text"}},{"name":"connectionURL","value":{"type":"STRING","string":"Driver=Microsoft Access Text Driver (*.txt, *.csv);Dbq=c:\\temp\\txtFilesFolder\\; Extensions=asc,csv,tab,txt;"}},{"name":"use64BitDriver","value":{"type":"BOOLEAN","boolean":true}},{"name":"isUserDefinedDriver","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"8884cfde-75b7-4899-980d-2d002f6fa002","commandName":"sqlQuery","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default64"}},{"name":"query","value":{"type":"STRING","string":"select * from [test.csv]"}},{"name":"doExport","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"2cbf24f7-ad6a-47a1-b822-19e666302d30","commandName":"disconnect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default64"}},{"name":"dosaveData","value":{"type":"BOOLEAN","boolean":true}}]},{"uid":"637c21fc-76b0-4a9d-8010-d1e44f1ccd52","commandName":"loop.commands.start","packageName":"Loop","disabled":false,"children":[{"uid":"f0b71ea5-6b55-44f4-8e19-ee55075be621","commandName":"Comment","packageName":"Comment","disabled":false,"attributes":[{"name":"comment","value":{"type":"STRING","string":"Add business logic for each row in csv file"}}]}],"attributes":[{"name":"loopType","value":{"type":"STRING","string":"ITERATOR"}},{"name":"iterator","returnTo":{"type":"DICTIONARY","dictionary":[{"key":"header1","value":{"type":"VARIABLE","variableName":"sHeader1"}},{"key":"header2","value":{"type":"VARIABLE","variableName":"sHeader2"}}]},"attributes":[{"name":"session","value":{"type":"STRING","string":"Default64"}}],"value":{"type":"ITERATOR","iteratorName":"iterators.resultset","packageName":"Database"}}]}],"attributes":[{"name":"title","value":{"type":"STRING","string":"64 Bit  Driver - Connect to Text or CSV files using database driver (Read Only)"}}]},{"uid":"74d4e38c-c233-4eb6-ac44-b7ae8c8b40c8","commandName":"step","packageName":"Step","disabled":false,"children":[{"uid":"0416532a-fb92-489a-922b-facc0352f63a","commandName":"connect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default32"}},{"name":"connectionMode","value":{"type":"STRING","string":"DEFAULT"}},{"name":"connectionOption","value":{"type":"STRING","string":"text"}},{"name":"connectionURL","value":{"type":"STRING","string":"Driver={Microsoft Text Driver (*.txt; *.csv)};Dbq=c:\\temp\\txtFilesFolder\\;Extensions=asc,csv,tab,txt;"}},{"name":"use64BitDriver","value":{"type":"BOOLEAN","boolean":false}},{"name":"isUserDefinedDriver","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"27f2aed3-e8d1-4ee6-85be-cdd442847574","commandName":"sqlQuery","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default32"}},{"name":"query","value":{"type":"STRING","string":"select * from [test.csv]"}},{"name":"doExport","value":{"type":"BOOLEAN","boolean":false}}]},{"uid":"b8b861a8-ae20-4237-b34f-d9df77bceb90","commandName":"disconnect","packageName":"Database","disabled":false,"attributes":[{"name":"session","value":{"type":"STRING","string":"Default32"}},{"name":"dosaveData","value":{"type":"BOOLEAN","boolean":true}}]},{"uid":"91872a48-4a34-41fc-8504-f9f0842a00f1","commandName":"loop.commands.start","packageName":"Loop","disabled":false,"children":[{"uid":"fddb12f0-1a10-47a1-95e3-41a05674197e","commandName":"Comment","packageName":"Comment","disabled":false,"attributes":[{"name":"comment","value":{"type":"STRING","string":"Add business logic for each row in csv file"}}]}],"attributes":[{"name":"loopType","value":{"type":"STRING","string":"ITERATOR"}},{"name":"iterator","returnTo":{"type":"DICTIONARY","dictionary":[{"key":"header1","value":{"type":"VARIABLE","variableName":"sHeader1"}},{"key":"header2","value":{"type":"VARIABLE","variableName":"sHeader2"}}]},"attributes":[{"name":"session","value":{"type":"STRING","string":"Default32"}}],"value":{"type":"ITERATOR","iteratorName":"iterators.resultset","packageName":"Database"}}]}],"attributes":[{"name":"title","value":{"type":"STRING","string":"32 Bit  Driver - Connect to Text or CSV files using database driver (Read Only)"}}]}],"variables":[{"name":"sExcelFilePath","description":"","type":"STRING","readOnly":false,"input":false,"output":false,"defaultValue":{"type":"STRING","string":""}},{"name":"sHeader1","description":"","type":"STRING","readOnly":false,"input":false,"output":false,"defaultValue":{"type":"STRING","string":""}},{"name":"sHeader2","description":"","type":"STRING","readOnly":false,"input":false,"output":false,"defaultValue":{"type":"STRING","string":""}}],"breakpoints":[],"packages":[{"name":"Comment","version":"2.14.0"},{"name":"Database","version":"4.12.2"},{"name":"Loop","version":"3.6.0-20220928-191723"},{"name":"Step","version":"2.5.0-20230105-135537"},{"name":"String","version":"5.7.1"}],"migrationJournalReviewIds":[],"workItemTemplateName":null,"properties":{"botCodeVersion":"3","improvedNumberSupport":true,"timeout":"0s","automationPriority":"PRIORITY_MEDIUM"}}
```


You will now be able to use each variable in the csv file within your business logic.

### Troubleshooting

#### Incorrect data being read from CSV file column / row

The ODBC drivers can sometimes infer types incorrectly, this will result in alphanumerical values being truncated incorrectly

For example, a column value of `S1` can be truncated to `1` when the driver infers a numerical type.

This can be caused by incorrect generation of the CSV file or incorrect encoding.

Some things you can try to fix this issue are:

- Create the file as an XLSX file, then have your Task rename the file to CSV. _If csv file format is a must_
- Define a [schema file](https://learn.microsoft.com/en-us/sql/odbc/microsoft/schema-ini-file-text-file-driver?view=sql-server-ver16) for the ODBC driver to use. This will also require your connection string to be updated to
  include `IMEX=1`

_Example Connection String:_ `Driver=Microsoft Access Text Driver (*.txt, *.csv);Dbq=c:\txtFilesFolder\; Extensions=asc,csv,tab,txt;IMEX=1;`

_Example `schema.ini` file_

[Microsoft](https://learn.microsoft.com/en-us/sql/odbc/microsoft/schema-ini-file-text-file-driver?view=sql-server-ver16) have a deeper dive into what this configuration refers to

```ini
[csvFileName.csv]
ColNameHeader=True
MaxScanRows=0 
Format=CSVDelimited
Col1="ColumnOneName" Text
Col2="ColumnTwoName" Text
Col3="ColumnThreeName" Integer
```