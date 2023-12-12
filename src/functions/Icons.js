export const getIconByType = (variable) => {
  const lowerCaseVariable = variable.toLowerCase();

  switch (lowerCaseVariable) {
    case "application":
      return "bi bi-terminal text-primary-emphasis"
    case "boolean":
      return "bi bi-flag-fill text-primary-emphasis";
    case "comment":
      return "bi bi-chat-left-quote text-success-emphasis";
    case "csvtxt":
      return "bi bi-filetype-csv text-primary-emphasis";
    case "database":
      return "bi bi-database text-primary-emphasis";
    case "email":
      return "bi bi-envelope text-primary-emphasis";
    case "errorhandler":
      return "bi bi-exclamation-triangle text-danger";
    case "excel_ms":
      return "bi bi-filetype-xlsx text-success-emphasis"
    case "datetime":
      return "bi bi-calendar-event text-primary-emphasis"
    case "dictionary":
      return "bi bi-journals text-primary-emphasis";
    case "file":
      return "bi bi-file-earmark text-primary-emphasis";
    case "if":
      return "bi bi-diamond text-warning"
    case "keystrokes":
      return "bi bi-keyboard text-primary-emphasis"
    case "legacyautomation":
      return "bi bi-slash-square text-muted"
    case "logtofile":
      return "bi bi-filetype-txt text-primary-emphasis"
    case "loop":
      return "bi bi-arrow-clockwise text-purple";
    case "list":
      return "bi bi-list-ol text-primary-emphasis";
    case "messagebox":
      return "bi bi-window-desktop text-primary-emphasis";
    case "number":
      return "bi bi-hash text-primary-emphasis";
    case "record":
      return "bi bi-tablet-landscape text-primary-emphasis";
    case "recorder":
      return "bi bi-camera-video text-primary-emphasis"
    case "string":
      return "bi bi-quote text-primary-emphasis";
    case "table":
      return "bi bi-table text-primary-emphasis";
    case "taskbot":
      return "bi bi-wrench-adjustable-circle text-primary-emphasis";
    case "delay":
      return "bi bi-stopwatch text-primary-emphasis";
    case "window":
      return "bi bi-window text-primary-emphasis";
    default:
      return "";
  }
};
