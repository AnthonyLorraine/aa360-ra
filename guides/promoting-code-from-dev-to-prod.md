## Promoting your code from Development to Production environments

### Background
This process is used for on premises control rooms on v27 or earlier, after v28 you can use the control room API or Code promotion functionality. 

### Prerequisites
- Code has been checked into the public folder on the Development environment

### Planning and Best practices

- Try not to export unrelated changes together
- Choose a time when the task has completed its work for the day. When a production task is running it uses a cached copy of the code. If you have imported code changes during a task run, and the task is restarted, it will use the new code.
- Ensure business owners and/or stakeholders are available to assist with any issues that arise and can advise if a back-out is required, in the worst case scenario.
- Allow ample time after the import to ensure a controlled input file is run end to end in the production environment.
  - This allows for any differences in environment to be identified 

### Exporting code from DEVELOPMENT
1. Log into the Development control room with a user that has the export role assigned.
2. Navigate to the task needing promotion to Production
3. Select the vertical ellipses ⋮ menu
4. Select the export icon (Up arrow escaping a box)
5. Select any additional tasks required in the export
6. Select the `Select Dependencies` tab from the left menu
7. Choose any dependencies you want to include or exclude
8. Select the `Select Packages` tab from the left menu
9. [Optional] Check the `Exclude bot packages` option, this will reduce the export file size for existing task exports. New tasks can include dependencies
10. Provide a valuable export name, such as `TaskName CommitVersion TicketReference CommitMessage`
    1. `TaskName` Name of the task being updated
    2. `CommitVersion` Version number of the code recently committed to public in the DEV environment
    3. `TicketReference` Jira Reference # or whichever ticketing system reference # used
    4. `CommitMessage` Shortened version of the commit message used when committing the changes to public in the DEV environment
    

_For example `DownloadInvoiceStatements v6 SR1234567 Added check for invalid date provided`_
    
_If the changes are to a main task with many subtasks, it is easier to bundle this change together and export once, use a relevant commit message to the overarching change and use the task name and version of the main task_

### Downloading the newly exported files
1. Log into the Development control room with a user that has the view historical activity role assigned.
2. Navigate to the `Activity` > `Historical` menu located within the main left menu
3. In the historical activity list, locate your Bot Export request and open the link text
4. Click the `Download exported zip file` button
5. Save the zip file to your exports directory

### Importing the code into Production
1. Log into the Production control room with a user that has the import and view audit log role assigned.
2. Navigate to the `Automation` menu located within the main left menu
3. Ensure you are on the `Public` tab
4. Click the `Import Bots` button located in the top right of the screen
5. Click `Browse` and navigate to your exports directory
6. Select the exported zip file
7. Ensure the `Public Tab` radio button is checked
8. Ensure the `Overwrite the bot or the file with the inported one` radio button is checked
9. Click the `Import bots` button from the top right
10. Navigate to the `Administration` > `Audit Log` menu located within the main left menu
11. Check the audit log for your import request and ensure it was successful

### Troubleshooting
- From the audit log, check for relevant messages
- Try exporting dependencies separately and importing them before your tasks
- Try exporting packages separately and importing them before your tasks


