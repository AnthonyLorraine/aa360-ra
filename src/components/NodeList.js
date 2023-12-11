import Node from "./Node";

const NodeList = ({nodes}) => {

    return (
        <>
            {nodes.map((node) =>(
                    <Node key={node.uid} node={node}/>
            ))}
        </>
    )
}


export default NodeList;