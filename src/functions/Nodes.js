import {getIconByType} from "./Icons";
import {Col} from "react-bootstrap";
import {getVariable} from "./Data";

export const getRepositoryFriendlyName = (repositoryPath) => {
    return decodeURIComponent(repositoryPath).replace("repository:///Automation Anywhere/", "")
}
const getFileFriendName = (filePath) => {
    return decodeURIComponent(filePath).replace("file://", "")
}
const conditionalValueText = (attribute) => {
    let expression = attribute.attributes[1].value.string
    let value = attribute.attributes[2].value.string
    if (value === "") {
        return "is Empty"
    }
    switch (expression) {
        case "EQ":
            return "= " + value
        default:
            return expression + " " + value
    }
}
const parseOperatorAttributes = (operatorAttribute) => {
    let returnElement = <><span className={"text-body text-lowercase fw-bold"}>{operatorAttribute.operator} (</span>{operatorAttribute.attributes[0].value.expression}<span
        className={"text-muted text-lowercase fw-normal"}> {conditionalValueText(operatorAttribute)}</span><span className={"text-body text-lowercase fw-bold"}>)</span></>

    try {
        returnElement = <>{returnElement} {parseOperatorAttributes(operatorAttribute.operatorAttribute)}</>
    } catch (e) {

    }
    return returnElement
}
const getExpressionList = (node) => {
    let expressionList = <><span className={"text-body text-lowercase fw-bold"}>(</span>{node.attributes[0].attributes[0].value.expression} <span
        className={"text-muted text-lowercase fw-normal"}>{conditionalValueText(node.attributes[0])}</span><span className={"text-body text-lowercase fw-bold"}>)</span></>
    return <>{expressionList} {parseOperatorAttributes(node.attributes[0].operatorAttribute)}</>
}
const getIfHtml = (node) => {
    let icon = getIconByType(node.packageName)
    let spacingClass = " me-2"
    icon = icon + spacingClass
    let packageNameConditionalName = node.attributes[0].value.conditionalName + "_" + node.attributes[0].value.packageName

    switch (packageNameConditionalName.toLowerCase()) {
        case "capture_recorder":
            return <Col className={"text-break text-truncate pe-0"}>
                <i className={icon}></i>
                <span className={"fw-bold text-capitalize" + spacingClass}>If</span>
                <span className={"text-primary-emphasis small fw-bold"}>{node.attributes[0].attributes[0].value.uiObject.controlType}<span
                    className={"text-muted text-lowercase fw-normal"}> with text</span> {node.attributes[0].attributes[0].value.uiObject.criteria.Name.value.string} <span
                    className={"text-muted text-lowercase fw-normal"}>in current {node.attributes[0].attributes[0].value.uiObjectWindow.type} exists</span></span>
            </Col>
        case "stringvariable_string":
            let expressionList = getExpressionList(node)
            return <Col className={"text-break text-truncate pe-0"}>
                <i className={icon}></i>
                <span className={"fw-bold text-capitalize" + spacingClass}>If</span>
                <span className={"text-primary-emphasis small fw-bold"}>{expressionList}</span>
            </Col>
        case "folderdoesnotexists_folder":
            let path = getFileFriendName(node.attributes[0].attributes[0].value.expression)
            return <Col className={"text-break text-truncate pe-0"}>
                <i className={icon}></i>
                <span className={"fw-bold text-capitalize" + spacingClass}>If</span><span className={"text-primary-emphasis small fw-bold"}>{path}<span className={"text-muted text-lowercase fw-normal"}> does not exist</span></span>
            </Col>
        case "windowtitledoesnotexists_window":
            let windowVariable = node.attributes[0].attributes[1].value.expression
            let variableNode = getVariable(windowVariable)
            let windowTitle = variableNode.defaultValue.window.name

            return <Col className={"text-break text-truncate pe-0"}>
                <i className={icon}></i>
                <span className={"fw-bold text-capitalize" + spacingClass}>If</span>
                <span className={"text-primary-emphasis small fw-bold"}><span className={"text-muted fw-normal"}>Window title </span>{windowTitle}</span><span className={"text-muted text-lowercase fw-normal"}> does not exist</span>
            </Col>
        default:
            return <Col className={"text-break text-truncate pe-0"}>
                <i className={icon}></i>
                <span className={"fw-bold text-capitalize" + spacingClass}>If</span>
                <span className={"text-primary-emphasis small fw-bold"}>Not Implemented</span>
            </Col>
    }
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
            let sourceText = node.attributes[0].value.expression || node.attributes[0].value.string
            return <>
                <Col className={"text-break text-truncate pe-0"}>
                    <i className={icon}></i>
                    <span className={"fw-bold text-capitalize" + spacingClass}>{friendlyName}</span>
                    <span className={"text-primary-emphasis small fw-bold"}>{sourceText}<span className={"text-muted text-lowercase fw-normal"}> to</span> ${node.returnTo.variableName}$</span>
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
        case "if_if":
            return <>
                {getIfHtml(node)}
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

