import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";
import MermaidRenderer from "../functions/Mermaid";
import Code from "./Code";

const extractJsonDataFromAANode = (markdownText) => {
    if (markdownText === null || markdownText === undefined) {
        return
    }

    let startIndex = markdownText.indexOf('```aacode');
    let endIndex = markdownText.indexOf('\n```', startIndex);
    let jsonData = null
    let mdText = markdownText
    if (startIndex > 0) {

        jsonData = JSON.parse(markdownText.substring(startIndex + 10, endIndex))
        mdText = markdownText.substring(0, startIndex)
        mdText = mdText + "_* See code example at the bottom of the page_"
        mdText = mdText + markdownText.substring(endIndex + 4)

    }
    return {
        mdText: mdText,
        jsonData: jsonData
    }
}
const Guide = () => {
    const {guideName} = useParams();
    const markdownPath = process.env.PUBLIC_URL + '/guides/' + guideName + '.md';
    const [markdownText, setMarkdownText] = useState(null);
    let mdText = markdownText
    useEffect(() => {
        fetch(markdownPath)
            .then(response => response.text())
            .then(mdContent => {
                setMarkdownText(mdContent);
            })
            .catch(error => console.error('Error loading Markdown File:', error));
    }, [markdownPath]);
    let aaCode = null;
    if (mdText !== null) {
        let extractedData = extractJsonDataFromAANode(mdText)
        mdText = extractedData.mdText
        aaCode = extractedData.jsonData
    }

    function LinkRenderer(props) {
        return (
            <a href={props.href} target="_blank" rel="noreferrer">
                {props.children}
            </a>
        );
    }

    return (
        <>
            <section id={"guide-container"} className={"pb-5 container-md"}>
                <MermaidRenderer/>
                <ReactMarkdown className={"mt-5"} components={{a: LinkRenderer}}>
                    {mdText}
                </ReactMarkdown>
            </section>
            {aaCode ? (<section id={"aa-code-example"} className={"p-md-2"}><Code jsonData={aaCode} scriptTitle={"AA Code example: " + guideName.replaceAll('-', ' ')}/></section>) : ""}
        </>
    )
}


export default Guide;