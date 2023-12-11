export const getIconByType = (variable) => {
  const lowerCaseVariable = variable.toLowerCase();

  switch (lowerCaseVariable) {
    case "application":
      return "bi bi-terminal text-primary"
    case "boolean":
      return "bi bi-flag-fill text-primary";
    case "comment":
      return "bi bi-chat-left-quote text-success";
    case "csvtxt":
      return "bi bi-filetype-csv text-primary";
    case "database":
      return "bi bi-database text-primary";
    case "email":
      return "bi bi-envelope text-primary";
    case "errorhandler":
      return "bi bi-exclamation-triangle text-danger";
    case "excel_ms":
      return "bi bi-filetype-xlsx text-success"
    case "datetime":
      return "bi bi-calendar-event text-primary"
    case "dictionary":
      return "bi bi-journals text-primary";
    case "file":
      return "bi bi-file-earmark text-primary";
    case "if":
      return "bi bi-diamond text-warning"
    case "keystrokes":
      return "bi bi-keyboard text-primary"
    case "legacyautomation":
      return "bi bi-slash-square text-muted"
    case "logtofile":
      return "bi bi-filetype-txt text-primary"
    case "loop":
      return "bi bi-arrow-clockwise text-purple";
    case "list":
      return "bi bi-list-ol text-primary";
    case "messagebox":
      return "bi bi-window-desktop text-primary";
    case "number":
      return "bi bi-hash text-primary";
    case "record":
      return "bi bi-tablet-landscape text-primary";
    case "recorder":
      return "bi bi-camera-video text-primary"
    case "string":
      return "bi bi-quote text-primary";
    case "table":
      return "bi bi-table text-primary";
    case "taskbot":
      return "bi bi-wrench-adjustable-circle text-primary";
    case "delay":
      return "bi bi-stopwatch text-primary";
    case "window":
      return "bi bi-window text-primary";
    default:
      return "";
  }
};
