import {getIconByType} from "./Icons";
import {Col} from "react-bootstrap";

export const getRepositoryFriendlyName = (repositoryPath) => {
    return decodeURIComponent(repositoryPath).replace("repository:///Automation Anywhere/", "")
}
const getFileFriendName = (filePath) => {
  return decodeURIComponent(filePath).replace("file://", "")
}
const getInformationHtml = (node) => {
    let commandNamePackageName = node.packageName + "_" + node.commandName
    let friendlyName = node?.packageName.toLowerCase() === node?.commandName.toLowerCase() ? node.packageName : node?.packageName + ": " + node?.commandName
    let icon = getIconByType(node.packageName)
    let spacingClass = " me-2"
    icon = icon + spacingClass

    switch (commandNamePackageName.toLowerCase()) {
        case "comment_comment":
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize text-success-emphasis" + spacingClass}>{friendlyName}</span>
                    <span className={"text-success-emphasis small"}>{node.attributes[0].value.string}</span>
                </Col>
            </>
        case "string_assign":
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize" + spacingClass}>{friendlyName}</span>
                    <span className={"text-primary-emphasis small fw-bold"}>{node.attributes[0].value.expression}<span className={"text-muted text-lowercase fw-normal"}> to</span> ${node.returnTo.variableName}$</span>
                </Col>
            </>
        case "datetime_tostring":
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize" + spacingClass}>{friendlyName}</span>
                    <span className={"text-muted small"}>Convert <strong>{node.attributes[0].value.expression}</strong> and assign result to <strong>${node.returnTo.variableName}$</strong></span>
                </Col>
            </>
        case "taskbot_runtask":
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize" + spacingClass}>{friendlyName}</span>
                    <span className={"text-primary-emphasis fw-bold small"}>{getRepositoryFriendlyName(node.attributes[0].value.taskbotFile.string)}<span
                        className={"text-muted text-lowercase fw-normal"}> and assign output to variable</span></span>
                </Col>
            </>
        case "logtofile_logtofile":
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize" + spacingClass}>Log To File: Log text to file</span>
                    <span className={"text-primary-emphasis small fw-bold"}>{node.attributes[1].value.string}<span className={"text-muted text-lowercase fw-normal"}>to</span> {getFileFriendName(node.attributes[0].value.expression)}</span>
                </Col>
            </>
        default:
            return <>
                <Col className={"text-capitalize"}>
                    <i className={icon}></i>
                    <span className={"fw-bold"}>{friendlyName}</span>
                    <span className={"text-muted ms-2"}></span>
                </Col>
            </>
    }
}
export const getNodeInformation = (node) => {

    let informationHtml = getInformationHtml(node)
    return {
        informationHtml: informationHtml,
    }
}

