import {Col} from "react-bootstrap";
import {getVariable} from "./Data";

const ActionColors = {
    RED: 'text-danger',
    GREEN: 'text-success-emphasis',
    BLUE: 'text-primary-emphasis',
    YELLOW: 'text-warning',
    GREY: 'text-muted',
    PURPLE: 'text-purple',
    NONE: 'text-body'
};

const ActionIcons = {
    CHAT_LEFT_QUOTE: `bi-chat-left-quote`,
    QUOTE: 'bi-quote',
    TERMINAL: 'bi-terminal',
    FLAG_FILL: 'bi-flag-fill',
    FILETYPE_CSV: 'bi-filetype-csv',
    DATABASE: 'bi-database',
    ENVELOPE: 'bi-envelope',
    EXCLAMATION_TRIANGE: 'bi-exclamation-triangle',
    FILETYPE_XLSX: 'bi-filetype-xlsx',
    CALENDAR_EVENT: 'bi-calendar-event',
    JOURNALS: 'bi-journals',
    FILE_EARMARK: 'bi-file-earmark',
    DIAMOND: 'bi-diamond',
    KEYBOARD: 'bi-keyboard',
    SLASH_SQUARE: 'bi-slash-square',
    FILETYPE_TXT: 'bi-filetype-txt',
    ARROW_CLOCKWISE: 'bi-arrow-clockwise',
    LIST_OL: 'bi-list-ol',
    WINDOW_DESKTOP: 'bi-window-desktop',
    HASH: 'bi-hash',
    TABLET_LANDSCAPE: 'bi-tablet-landscape',
    CAMERA_VIDEO: 'bi-camera-video',
    TABLE: 'bi-table',
    WRENCH_ADJUSTABLE_CIRCLE: 'bi-wrench-adjustable-circle',
    STOPWATCH: 'bi-stopwatch',
    WINDOW: 'bi-window',
}

const getFilePathFriendlyName = (filePath) => {
    let removeString = "file://"
    if (filePath.startsWith('repository')) {
        removeString = "repository:///Automation Anywhere/"
    }
    return decodeURIComponent(filePath).replace(removeString, "")
}

export class BaseAction {
    constructor(nodeData) {
        this.uid = nodeData.uid
        this.commandName = nodeData.commandName
        this.packageName = nodeData.packageName
        this.disabled = nodeData.disabled
        this.attributes = nodeData.attributes
        this.returnTo = nodeData.returnTo
        this.setDefaultIcon()
        this.setDefaultColour()
    }

    createNodeHtml(descriptionElement) {
        return <>
            <Col className={"text-break text-truncate pe-0"}>
                <i className={this.getIcon()}></i>
                <span className={"fw-bold text-capitalize mx-2"}>{this.friendlyName}</span>
                <span className={this.getColour() + " small"}>{descriptionElement}</span>
            </Col>
        </>
    }

    renderNode() {
        return <Col>"{this.friendlyName}" action has not Implemented</Col>
    }

    renderProperties() {
        return undefined
    }

    getIconProviderPrefix() {
        return 'bi'
    }

    setDefaultIcon() {
        return undefined
    }

    getIcon() {
        return `${this.getIconProviderPrefix()} ${this.setDefaultIcon()} ${this.setDefaultColour()}`
    }

    setDefaultColour() {
        return undefined
    }

    getColour() {
        return this.setDefaultColour()
    }

    get friendlyName() {
        if (this.packageName.toLowerCase() === this.commandName.toLowerCase()) {
            return this.packageName
        } else {
            return this.packageName + ": " + this.commandName;
        }

    }

}

export class CommentAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
    }

    setDefaultColour() {
        return ActionColors.GREEN
    }

    setDefaultIcon() {
        return ActionIcons.CHAT_LEFT_QUOTE
    }

    renderNode() {
        let descriptionElement = <>{this.attributes[0].value.string}</>
        return this.createNodeHtml(descriptionElement)
    }
}

export class StringAssignAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
    }

    setDefaultColour() {
        return ActionColors.BLUE
    }

    setDefaultIcon() {
        return ActionIcons.QUOTE
    }

    renderNode() {
        let descriptionText = this.attributes[0].value.expression || this.attributes[0].value.string;
        if (descriptionText === '') {
            descriptionText = '""'
        }
        let descriptionElement = <>
            <strong>{descriptionText}</strong>
            <span className={"text-muted text-lowercase fw-normal"}> to </span>
            <strong>{this.returnTo.variableName}</strong>
        </>
        return this.createNodeHtml(descriptionElement)
    }
}

export class DateTimeToStringAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
    }

    setDefaultColour() {
        return ActionColors.GREY
    }

    setDefaultIcon() {
        return ActionIcons.CALENDAR_EVENT
    }

    renderNode() {
        let descriptionElement = <>
            Convert <strong>{this.attributes[0].value.expression}</strong> and assign result to <strong>${this.returnTo.variableName}$</strong>
        </>
        return this.createNodeHtml(descriptionElement)
    }
}

export class TaskbotRunAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
    }

    setDefaultColour() {
        return ActionColors.BLUE
    }

    setDefaultIcon() {
        return ActionIcons.WRENCH_ADJUSTABLE_CIRCLE
    }

    renderNode() {
        let descriptionElement = <>
            {getFilePathFriendlyName(this.attributes[0].value.taskbotFile.string)}<span
            className={"text-muted text-lowercase fw-normal"}> and assign output to variable</span>
        </>
        return this.createNodeHtml(descriptionElement)
    }
}

export class LogToFileAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
    }

    setDefaultColour() {
        return ActionColors.BLUE
    }

    setDefaultIcon() {
        return ActionIcons.FILETYPE_TXT
    }

    renderNode() {
        let descriptionElement = <span className={"text-primary-emphasis small fw-bold"}>
            {this.attributes[1].value.string}
            <span className={"text-muted text-lowercase fw-normal"}>to </span>
            {getFilePathFriendlyName(this.attributes[0].value.expression)}
        </span>
        return this.createNodeHtml(descriptionElement)
    }
}

export class IfAction extends BaseAction {
    constructor(nodeData) {
        super(nodeData);
        this.conditionalName = undefined
        try {
            this.conditionalName = this.attributes[0].value.conditionalName.toLowerCase() + "_" + this.attributes[0].value.packageName.toLowerCase()
        } catch (e) {
            try {
                this.conditionalName = this.attributes[1].value.conditionalName.toLowerCase() + "_" + this.attributes[1].value.packageName.toLowerCase()
            } catch (e) {
                console.log(e)
            }
        }
    }

    setDefaultColour() {
        return ActionColors.YELLOW
    }

    setDefaultIcon() {
        return ActionIcons.DIAMOND
    }

    renderNode() {
        return this.createNodeHtml(this.#getAttributeHtml())
    }

    #conditionalValueText = (attribute) => {
        let expression = attribute.attributes[1].value.string
        let value = attribute.attributes[2].value.string
        if (value === "") {
            return "is Empty"
        }

        switch (expression) {
            case "EQ":
                return "= " + value
            case "INCLUDE":
                return `includes "${value}"`
            default:
                return expression + " " + value
        }
    }
    #parseOperatorAttributes = (operatorAttribute) => {
        // console.log(operatorAttribute)
        // console.log(operatorAttribute)
        // let returnElement = <><span className={"text-body text-lowercase fw-bold"}>{operatorAttribute.operator} (</span>{operatorAttribute.attributes[0].value.expression}<span
        //     className={"text-muted text-lowercase fw-normal"}> {this.#conditionalValueText(operatorAttribute)}</span><span className={"text-body text-lowercase fw-bold"}>)</span></>
        // try {
        //     returnElement = <>{returnElement} {this.#parseOperatorAttributes(operatorAttribute.operatorAttribute)}</>
        // } catch (e) {
        //
        // }
        // return returnElement
    }
    #getExpressionList = () => {
        let expressionList = <>
            <span className={"text-body text-lowercase fw-bold"}>
                (
            </span>
            {this.attributes[0].attributes[0].value.expression}
            <span className={"text-muted text-lowercase fw-normal ps-1"}>
                {this.#conditionalValueText(this.attributes[0])}
            </span>
            <span className={"text-body text-lowercase fw-bold"}>
                )
            </span>
        </>
        return <>{expressionList} {this.#parseOperatorAttributes(this.attributes[0])}
        </>

    }

    #getAttributeHtml() {
        console.log(this.conditionalName)
        switch (this.conditionalName) {
            case "capture_recorder":
                return <>
                    <span className={"text-primary-emphasis small fw-bold"}>{this.attributes[0].attributes[0].value.uiObject.controlType}<span
                        className={"text-muted text-lowercase fw-normal"}> with text</span> {this.attributes[0].attributes[0].value.uiObject.criteria.Name.value.string} <span
                        className={"text-muted text-lowercase fw-normal"}>in current {this.attributes[0].attributes[0].value.uiObjectWindow.type} exists</span></span>
                </>

            case "stringvariable_string":
                return <span className={"text-primary-emphasis small fw-bold"}>{this.#getExpressionList()}</span>

            case "folderdoesnotexists_folder":
            case "fileexists_file":
                let path = getFilePathFriendlyName(this.attributes[0].attributes[0].value.expression)
                return <>
                    {path}<span className={"text-muted text-lowercase fw-normal"}> does not exist</span>
                </>

            case "windowtitledoesnotexists_window":
                let windowVariable = this.attributes[0].attributes[1].value.expression
                let variablethis = getVariable(windowVariable)
                let windowTitle = variablethis.defaultValue.window.name
                return <>
                    <span className={"text-primary-emphasis small fw-bold"}><span className={"text-muted fw-normal"}>Window title </span>{windowTitle}</span><span className={"text-muted text-lowercase fw-normal"}> does not exist</span>
                </>

            default:
                return <>
                    <span className={"text-primary-emphasis small fw-bold"}>{this.conditionalName} Not Implemented</span>
                </>
        }
    }

}

export const getAction = (node) => {
    let commandNamePackageName = node.packageName.toLowerCase() + "_" + node.commandName.toLowerCase()

    switch (commandNamePackageName) {
        case "comment_comment":
            return new CommentAction(node)
        case "string_assign":
            return new StringAssignAction(node)
        case "datetime_tostring":
            return new DateTimeToStringAction(node)
        case "taskbot_runtask":
            return new TaskbotRunAction(node)
        case "logtofile_logtofile":
            return new LogToFileAction(node)
        case "if_if":
            return new IfAction(node)
        default:
            return new BaseAction(node)
    }
}