import {useEffect} from 'react';
import mermaid from 'mermaid';

const MermaidRenderer = () => {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
        });

        mermaid.init(undefined, '.language-mermaid');
    }, []);

    return null;
};

export default MermaidRenderer;
