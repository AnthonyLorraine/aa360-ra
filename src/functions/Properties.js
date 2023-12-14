import {Col, Row} from "react-bootstrap";
import {getRepositoryFriendlyName} from "./Nodes";

const propertyAttributes = (attributes) => {
    return (
        <>
            {attributes.map((attr, index) => (
                <>
                    <Row key={index} className={"mt-3"}>
                        <span className={"small p-0"}>{attr.name}</span>
                        <input readOnly value={attr.value.expression || attr.value.string} className={"pb-2 pt-1"}/>
                    </Row>
                </>
            ))}
        </>
    )
}
const propertyReturnTo = (returnToList) => {
    console.log(returnToList)
    if (typeof returnToList) {

    }
    return (
        <>
            {returnToList.map((attr, index) => (
                <>
                    <Row key={index} className={"mt-3"}>
                        <span className={"small p-0"}>{attr.key}</span>
                        <input readOnly value={attr.value.variableName} className={"pb-2 pt-1"}/>
                    </Row>
                </>
            ))}
        </>
    )
}

const getTextAreaRowCount = (text) => {
    text = text.replaceAll("  ", "")
    let line_length = 43
    let rows_count = 0
    let sentence = ''

    // Calculate rows by counting letters and splitting then by line_length, counting how many splits occurred
    for (let i = 0; i < text.length; i++) {
        sentence = sentence+text[i]
        if (sentence.length === line_length) {
            rows_count += 1
            sentence = ''
        }
    }
    // if there are remaining characters, meaning we need to add another row to ensure they are shown
    if (sentence.length !== 0) {
        rows_count += 1
    }
    // Check if words are longer than the line, if they are, they will break early, causing additional lines
    let words = text.split(' ')
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > line_length && words.length !== 1) {
            rows_count += 1
        }
    }
  return  rows_count
}
const propertyHeader = (friendlyName, propertyDescription) => {
    let descLines = propertyDescription.split('\n');
    let descHtml = (
        <div className={"p-0"} style={{maxHeight: 70, minHeight: 70}}>
            {descLines.map((line, index) => (
                <><span key={index}>{line}</span><br/></>
            ))}
        </div>
    );
    return <>
        <Row className={"text-capitalize"}>
            {friendlyName}
        </Row>
        <Row className={"small text-muted mt-4"}>
            {descHtml}
        </Row>
    </>
}
const getPropertiesHtml = (node) => {
    console.log(node)
    let commandNamePackageName = node.packageName + "_" + node.commandName
    console.log(commandNamePackageName)
    let commandNamePackageNameFriendly = node.packageName + ": " + node.commandName
    switch (commandNamePackageName.toLowerCase()) {
        case "errorhandler_try":
            return <>
                {propertyHeader(commandNamePackageNameFriendly, "Attempt a sequence of commands that might fail with an exception.")}
            </>
        case "comment_comment":
            return <>
                {propertyHeader(commandNamePackageNameFriendly, "Inserts a comment\n" +
                    "Note: Comments are ignored when the bot runs")}
                <Row className={"mt-3"}>
                    <span className={"small p-0"}>Comment</span>
                    <textarea readOnly value={node.attributes[0].value.string} rows={getTextAreaRowCount(node.attributes[0].value.string)} className={"pb-2 pt-1 text-break text-wrap"}/>
                </Row>
            </>
        case "string_assign":
            return <>
                {propertyHeader(commandNamePackageNameFriendly, "Assigns or concatenates strings.")}
                <Row className={"mt-3"}>
                    <span className={"small p-0"}>Source string</span>
                    <textarea readOnly rows={getTextAreaRowCount(node.attributes[0].value.expression)} value={node.attributes[0].value.expression} className={"pb-2 pt-1 text-break text-wrap"}/>
                </Row>
                <hr/>
                <Row className={"mt-3"}>
                    <span className={"small p-0"}>Destination variable</span>
                    <input readOnly value={node.returnTo.variableName} className={"pb-2 pt-1"}/>
                </Row>
            </>
        case "datetime_tostring":
            return <>
                {propertyHeader(commandNamePackageNameFriendly, "Converts a datetime value to a string value, and enables you to select a predefined format or specify a custom format for the output value")}

                {propertyAttributes(node.attributes)}
                <hr/>
                <Row className={"mt-3"}>
                    <span className={"small p-0"}>Destination variable</span>
                    <input readOnly value={node.returnTo.variableName} className={"pb-2 pt-1"}/>
                </Row>
            </>
        case "taskbot_runtask":
            let filePath = getRepositoryFriendlyName(node.attributes[0].value.taskbotFile.string)
            return <>
                {propertyHeader(commandNamePackageNameFriendly, "Runs the selected task bot.")}
                <Row className={"mt-3"}>
                    <span className={"small p-0"}>Task Bot to run</span>
                    <textarea rows={getTextAreaRowCount(filePath)} readOnly value={filePath} className={"pb-2 pt-1"}/>
                    <span className={"small p-0 mt-3"}>Input values</span>
                </Row>

                <Row className={"ms-3"}>
                    {node.attributes[0].value.taskbotInput.dictionary.map((input, index) => (
                        <>
                            <Row className={"mt-3"}>
                                <span className={"small p-0"}>{input.key}</span>
                                <input readOnly value={input.value.string || input.value.expression} className={"pb-2 pt-1"}/>
                            </Row>
                        </>
                    ))}
                </Row>
                <hr/>
                <Row className={"mt-3"}>
                    <span className={"small p-0 mt-3"}>Destination variable(/s)</span>
                </Row>
                <Row className={"ms-3"}>
                    {node.returnTo.dictionary ? propertyReturnTo(node.returnTo.dictionary) : <Row className={"mt-3"}>
                        <input readOnly value={node.returnTo.variableName} className={"pb-2 pt-1"}/>
                    </Row>}
                </Row>

            </>
        case "logtofile_logtofile":
            return <>
                <Col className={""}>
                    logtofile_logtofile
                </Col>
            </>
        default:
            return <>
                <Col className={""}>
                    Not Implemented
                </Col>
            </>
    }
}

export const getPropertyInformation = (node) => {
    let informationHtml = getPropertiesHtml(node)
    return {
        htmlElement: informationHtml,
    }
}
