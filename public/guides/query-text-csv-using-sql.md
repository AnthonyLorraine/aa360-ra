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
9. Choose how you want to store the variable, either multiple variables or a Record variable

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

```aacode
{
  "triggers": [],
  "nodes": [
    {
      "uid": "d21b9b9c-4e64-4117-94e7-8010eeec64d5",
      "commandName": "try",
      "packageName": "ErrorHandler",
      "disabled": false,
      "children": [
        {
          "uid": "bccc1a67-017c-4597-8301-fee1415281a3",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": " "
              }
            }
          ]
        },
        {
          "uid": "8edd2464-02bf-4607-ac2c-f9159254d0bd",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Author: Name "
              }
            }
          ]
        },
        {
          "uid": "8927eccc-81d5-48f8-ad7e-5a5cde22a1ef",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Date: 24/01/2026"
              }
            }
          ]
        },
        {
          "uid": "6188eee0-0109-440c-8a81-f88d39f54fb6",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Task overview text"
              }
            }
          ]
        },
        {
          "uid": "7dbb7269-705f-4942-a424-29f638525043",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": " "
              }
            }
          ]
        },
        {
          "uid": "b63b61fc-f1a6-41b3-b8aa-9763b6d2db2e",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Inputs"
              }
            }
          ]
        },
        {
          "uid": "69ba714c-8cab-4aaa-8a43-4e533ac42d62",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "vBotRunner: Provide the name of the bot runner to run on"
              }
            }
          ]
        },
        {
          "uid": "d8277914-acba-4197-9511-2b71c2038bbc",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": " "
              }
            }
          ]
        },
        {
          "uid": "b16294ae-e494-4ac3-be6a-131e9abe53ba",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Outputs"
              }
            }
          ]
        },
        {
          "uid": "d417b667-3f4a-4630-8e19-c52881df8882",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "my-list-variable: List of items processed"
              }
            }
          ]
        },
        {
          "uid": "8d172e51-5055-4dca-8589-9a7004449d21",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "vProcessStartTime: Time the task was initiated"
              }
            }
          ]
        },
        {
          "uid": "69c2e70f-05d1-4f0d-99a2-c226c564ad79",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": " "
              }
            }
          ]
        },
        {
          "uid": "c5293e2d-45df-4d24-a4aa-4180d74addfd",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Note: Can only be ran on 4 bot runners at a time"
              }
            }
          ]
        },
        {
          "uid": "cca6bae9-434c-4819-9e72-f638503ec72e",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": " "
              }
            }
          ]
        },
        {
          "uid": "6424e49e-bea9-45fd-935c-334efc7fff0d",
          "commandName": "Comment",
          "packageName": "Comment",
          "disabled": false,
          "attributes": [
            {
              "name": "comment",
              "value": {
                "type": "STRING",
                "string": "Business Owner: Name"
              }
            }
          ]
        },
        {
          "uid": "423ef96f-298e-4d82-b70a-99e513531b3c",
          "commandName": "assign",
          "packageName": "String",
          "disabled": false,
          "attributes": [
            {
              "name": "sourceString",
              "value": {
                "type": "STRING",
                "expression": "Bots\\Department\\Process\\Task\\"
              }
            }
          ],
          "returnTo": {
            "type": "VARIABLE",
            "variableName": "vMyTaskPath"
          }
        },
        {
          "uid": "6334958c-e89e-442f-a123-5d60f799dd6a",
          "commandName": "assign",
          "packageName": "String",
          "disabled": false,
          "attributes": [
            {
              "name": "sourceString",
              "value": {
                "type": "STRING",
                "expression": "$vLogFile$"
              }
            }
          ],
          "returnTo": {
            "type": "VARIABLE",
            "variableName": "m-string-start-in-path"
          }
        },
        {
          "uid": "e2d65996-f4f8-4eb6-8dc8-ae7d0c17ca06",
          "commandName": "logToFile",
          "packageName": "LogToFile",
          "disabled": false,
          "attributes": [
            {
              "name": "filePath",
              "value": {
                "type": "FILE",
                "expression": "file://$vLogFile$"
              }
            },
            {
              "name": "logContent",
              "value": {
                "type": "STRING",
                "string": "Process starting!"
              }
            },
            {
              "name": "appendTimestamp",
              "value": {
                "type": "BOOLEAN",
                "boolean": false
              }
            },
            {
              "name": "logOption",
              "value": {
                "type": "STRING",
                "string": "APPEND_FILE"
              }
            },
            {
              "name": "encodingValue",
              "value": {
                "type": "STRING",
                "string": "ANSI"
              }
            }
          ]
        }
      ],
      "branches": [
        {
          "uid": "72b11f81-3ab9-469b-ad05-eaa295744350",
          "commandName": "finally",
          "packageName": "ErrorHandler",
          "disabled": false,
          "children": [
            {
              "uid": "2f1b645c-fcfd-4433-90bf-84395438ae5c",
              "commandName": "runApp",
              "packageName": "Application",
              "disabled": false,
              "attributes": [
                {
                  "name": "filePath",
                  "value": {
                    "type": "FILE",
                    "string": "file://taskkill.exe"
                  }
                },
                {
                  "name": "startInPath",
                  "value": {
                    "type": "STRING",
                    "string": ""
                  }
                },
                {
                  "name": "parameters",
                  "value": {
                    "type": "STRING",
                    "string": "/f /im msedge.exe /t"
                  }
                }
              ]
            },
            {
              "uid": "16eeb864-9104-4d52-a235-57ec7ea64334",
              "commandName": "if",
              "packageName": "If",
              "disabled": false,
              "children": [
                {
                  "uid": "7a2e2963-b5e1-4914-a090-1350446d7d64",
                  "commandName": "throw",
                  "packageName": "ErrorHandler",
                  "disabled": false,
                  "attributes": [
                    {
                      "name": "exceptionType",
                      "value": {
                        "type": "EXCEPTION",
                        "exceptionName": "BotException",
                        "packageName": "ErrorHandler"
                      }
                    },
                    {
                      "name": "message",
                      "value": {
                        "type": "STRING",
                        "expression": "$Error-Description$ Exception occurred at line number $Error-LineNumber.Number:toString$. You chose to mark the bot as 'Failed' in case of any encountered errors."
                      }
                    }
                  ]
                }
              ],
              "branches": [],
              "attributes": [
                {
                  "name": "condition",
                  "attributes": [
                    {
                      "name": "variable",
                      "value": {
                        "type": "STRING",
                        "expression": "$M-IsBotExecutedSuccessfully.Boolean:toString$"
                      }
                    },
                    {
                      "name": "operator",
                      "value": {
                        "type": "STRING",
                        "string": "EqualsTo"
                      }
                    },
                    {
                      "name": "value",
                      "value": {
                        "type": "STRING",
                        "string": "false"
                      }
                    }
                  ],
                  "value": {
                    "type": "CONDITIONAL",
                    "conditionalName": "legacyConditionVariable",
                    "packageName": "LegacyAutomation"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "variables": [
    {
      "name": "my-list-variable",
      "description": "",
      "type": "LIST",
      "readOnly": false,
      "input": false,
      "output": true,
      "subtype": "STRING",
      "defaultValue": {
        "type": "LIST",
        "list": [
          {
            "type": "STRING",
            "string": "my-value-1"
          },
          {
            "type": "STRING",
            "string": "my-value-2"
          },
          {
            "type": "STRING",
            "string": "my-value-3"
          },
          {
            "type": "STRING",
            "string": "my-value-4"
          },
          {
            "type": "STRING",
            "string": "my-value-5"
          }
        ]
      }
    },
    {
      "name": "vProcessName",
      "description": "",
      "type": "STRING",
      "readOnly": false,
      "input": false,
      "output": false,
      "defaultValue": {
        "type": "STRING",
        "string": ""
      }
    },
    {
      "name": "vBotRunner",
      "description": "",
      "type": "STRING",
      "readOnly": false,
      "input": true,
      "output": false,
      "defaultValue": {
        "type": "STRING",
        "string": ""
      }
    },
    {
      "name": "vProcessStartTime",
      "description": "",
      "type": "STRING",
      "readOnly": false,
      "input": false,
      "output": true,
      "defaultValue": {
        "type": "STRING",
        "string": ""
      }
    }

  ],
  "migrationJournalReviewIds": [
    29592
  ],
  "workItemTemplateName": null,
  "properties": {
    "botCodeVersion": "1",
    "improvedNumberSupport": true,
    "timeout": "0s",
    "automationPriority": "PRIORITY_MEDIUM"
  }
}
```