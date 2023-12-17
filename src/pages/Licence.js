import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

const Licence = () => {
    const markdownPath = process.env.PUBLIC_URL + '/LICENCE.md';
    const [markdownText, setMarkdownText] = useState(null);

    useEffect(() => {
        fetch(markdownPath)
            .then(response => response.text())
            .then(mdContent => {
                setMarkdownText(mdContent);
            })
            .catch(error => console.error('Error loading Markdown File:', error));
    }, [markdownPath]);

    function LinkRenderer(props) {
        return (
            <a href={props.href} target="_blank" rel="noreferrer">
                {props.children}
            </a>
        );
    }

    return (
        <>
            <section className={"pb-5 container-md"}>
                <ReactMarkdown className={"mt-5"} components={{a: LinkRenderer}}>
                    {markdownText}
                </ReactMarkdown>
            </section>
        </>
    )
}


export default Licence;